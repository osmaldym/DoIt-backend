import mongoose, { Model } from "mongoose"

export class DBCall {
    static findOne(model: Model<any>, id: mongoose.Types.ObjectId) {
        return model.findOne({ _id: id, deleted: false });
    }

    static findAll(model: Model<any>) {
        return model.find({ deleted: false }).exec();
    }

    static updateOne(model: Model<any>, id: mongoose.Types.ObjectId, updateData: any){
        return model.updateOne({ _id: id, deleted: false }, updateData);
    }

    static async softRemoveOne(model: Model<any>, id: mongoose.Types.ObjectId) {
        const updatedRes = await model.updateOne({ _id: id, deleted: false }, { deleted: true, deletedAt: new Date() });
        const res: mongoose.mongo.DeleteResult = {
            acknowledged: updatedRes.acknowledged,
            deletedCount: updatedRes.modifiedCount
        }
        return res
    }
}