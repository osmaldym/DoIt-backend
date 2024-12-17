import * as mongoose from 'mongoose'
import { SoftDelete } from './softdelete.schema'

export const CategorySchema = new mongoose.Schema({
    title: String,
    ...SoftDelete
}, { timestamps: true, })