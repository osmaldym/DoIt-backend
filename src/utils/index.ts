import mongoose from "mongoose";

export const toMongoIds = (arr: Array<string>) => arr.map(_id => new mongoose.Types.ObjectId(_id))