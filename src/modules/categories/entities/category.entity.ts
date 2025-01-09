import mongoose from "mongoose";

export class Category {
    _id: mongoose.Types.ObjectId;
    by_user?: boolean;
    readonly name: string;
}
