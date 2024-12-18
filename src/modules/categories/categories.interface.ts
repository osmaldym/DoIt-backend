import mongoose, { Document } from "mongoose";

export interface Category extends Document {
    user_id: mongoose.Types.ObjectId;
    readonly name: string;
}