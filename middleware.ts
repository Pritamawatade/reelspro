import withAuth from "next-auth/middleware";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware() {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        // allow auth related URLs
        if (
          pathname.startsWith("api/auth") ||
          pathname == "/login" ||
          pathname == "/register"
        ) {
          return true;
        }

        // allow public urls
        if(pathname.startsWith("/") || pathname.startsWith("/api/videos")){
            return true;
        }

        return !!token;
      },
    },
  }
);



export const confitg = {
    matcher:["/((?!_next/static|_next/images | favicon.ico | public/).*)"],
    
}
