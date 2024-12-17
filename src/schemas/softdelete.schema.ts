import mongoose from "mongoose";

export const SoftDelete: mongoose.SchemaDefinition = {
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: undefined },
}