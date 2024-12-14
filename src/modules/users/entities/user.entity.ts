import * as mongoose from "mongoose";

export class User {
    _id?: mongoose.Types.ObjectId;
    email?: string;
    password?: string;
}
