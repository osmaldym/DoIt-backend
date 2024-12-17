import * as mongoose from 'mongoose'
import { SoftDelete } from './softdelete.schema';

export const UserSchema = new mongoose.Schema({
    email: String,
    password: String,
    ...SoftDelete
}, { timestamps: true, });