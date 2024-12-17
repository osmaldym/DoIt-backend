import { Document } from "mongoose";

export interface User extends Document {
    readonly email: string;
    password: string;
    deleted: boolean;
}