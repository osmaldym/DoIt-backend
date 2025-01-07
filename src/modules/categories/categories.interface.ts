import mongoose, { Document } from "mongoose";

export interface Category extends Document {
    user_id: mongoose.Types.ObjectId;
    by_user: boolean;
    readonly name: string;
}