import mongoose from "mongoose";

export class Task {
    _id?: mongoose.Types.ObjectId | string
    title?: string;
    description?: string;
    date?: Date | object;
    categories?: mongoose.Types.ObjectId[] | string[]
}
