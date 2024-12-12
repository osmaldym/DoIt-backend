import * as mongoose from 'mongoose'

export const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    category: mongoose.Types.ObjectId
})