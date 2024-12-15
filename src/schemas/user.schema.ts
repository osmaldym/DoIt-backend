import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
}, { timestamps: true, })