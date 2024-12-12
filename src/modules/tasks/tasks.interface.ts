import mongoose, { Document } from "mongoose";

export interface Task extends Document {
    readonly title: string,
    readonly description: string,
    readonly date: Date,
    readonly category: mongoose.Types.ObjectId
}