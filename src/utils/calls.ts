import mongoose, { Model } from "mongoose"
import { deleteAts } from "./responses";

export class DBCall {
    static async findOne(model: Model<any>, id: mongoose.Types.ObjectId) {
        let data = await model.findOne({ _id: id, deleted: false });
        data = deleteAts(data);
        return data;
    }

    static async findAll(model: Model<any>) {
        let allData = await model.find({ deleted: false }).exec();
        allData = allData.map(deleteAts);
        return allData;
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