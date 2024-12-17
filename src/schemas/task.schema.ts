import * as mongoose from 'mongoose'
import { SoftDelete } from './softdelete.schema'

export const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    category: mongoose.Types.ObjectId,
    ...SoftDelete
}, { timestamps: true, })