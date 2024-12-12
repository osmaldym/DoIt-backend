import mongoose from "mongoose";

export class Category {
    _id: mongoose.Types.ObjectId;
    readonly name: string;
}
