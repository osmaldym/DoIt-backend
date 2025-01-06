import * as mongoose from 'mongoose'
import { SoftDelete } from './softdelete.schema'

export const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    completed: { type: Boolean, default: false },
    category: mongoose.Types.ObjectId,
    user_id: mongoose.Types.ObjectId,
    ...SoftDelete
}, { timestamps: true, })