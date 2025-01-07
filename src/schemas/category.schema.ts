import * as mongoose from 'mongoose'
import { SoftDelete } from './softdelete.schema'

export const CategorySchema = new mongoose.Schema({
    title: String,
    user_id: mongoose.Types.ObjectId,
    by_user: Boolean,
    ...SoftDelete
}, { timestamps: true, })