import mongoose from "mongoose";

export class Task {
    _id: mongoose.Types.ObjectId
    title: string;
    description: string;
    date: Date;
    category: mongoose.Types.ObjectId
}
