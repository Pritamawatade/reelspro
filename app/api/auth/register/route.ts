import { NextResponse, NextRequest } from "next/server";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest){
 
    try {
        const { email, password}  = await request.json();

        if(!email || !password){
            return NextResponse.json(
                {error: "email and password are required"},
                {status: 400}
            )
        }

      try {
          await connectToDatabase();
      } catch (error) {
          return NextResponse.json(
              {error: "Database not connected"},
              {status: 500}
          )
        
      }
        const existingUser = await User.findOne({email})

        if(existingUser){
            return NextResponse.json(
                {error: "User already exists"},
                {status: 400}
            )
        }

       try {
         await User.create({email, password});
       } catch (error) {
           return NextResponse.json(
               {error: "User not register 1 "},
               {status: 500})
        
       }

        return NextResponse.json(
            {message: "User created successfully"},
            {status: 201}
        )

    } catch (error) {
        return NextResponse.json(
            {error: "User not register"},
            {status: 500}
        ) 
    }
}