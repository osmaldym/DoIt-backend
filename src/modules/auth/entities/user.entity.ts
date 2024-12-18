import mongoose from "mongoose";

export class AuthUser {
    sub: mongoose.Types.ObjectId;
    email: string;
}