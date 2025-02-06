import mongoose, { model, models, Schema } from 'mongoose';

export const  VIDEO_DEIMENSIONS = {
    WIDTH:1080,
    HEIGHT:1920
} as const;

export interface IVideo{
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    createdAt?: Date;
    updatedAt?: Date;
    controls?: boolean;
    transformation?:{
        width: number;
        height: number;
        quality?: number
    }

}


const videoSchema = new Schema<IVideo>(
    {
        title: {type: String, required: true},
        description: {type: String, required: true},
        videoUrl: {type: String, required: true},
        thumbnailUrl: {type: String, required: true},
        controls: {type: Boolean, default: false},
        transformation: {
            width: {type: Number, default: VIDEO_DEIMENSIONS.WIDTH},
            height: {type: Number, default: VIDEO_DEIMENSIONS.HEIGHT},
            quality: {type: Number, min:1 ,  max: 100}
        }
    },
    {
        timestamps: true
    }
);


const Video = models?.Video || model<IVideo>("Video", videoSchema);

export default Video;
