import mongoose, { Model } from "mongoose"
import { deleteAts } from "./responses";

export class DBCall {
    static async findOne(model: Model<any>, id: mongoose.Types.ObjectId, authUser: any = undefined) {
        let byUserOpt = {};
        if (authUser) byUserOpt['user_id'] = authUser.getUser().sub;
        let data = await model.findOne({ _id: id, deleted: false, ...byUserOpt });
        data = deleteAts(data);
        return data;
    }

    static async findAll(model: Model<any>, authUser: any = undefined) {
        let byUserOpt = {}
        if (authUser) byUserOpt['user_id'] = authUser.sub;
        let allData = await model.find({ deleted: false, ...byUserOpt }).exec();
        allData = allData.map(deleteAts);
        return allData;
    }

    static async findAllBy(model: Model<any>, filter: any, authUser: any = undefined) {
        let byUserOpt = {};
        if (authUser) byUserOpt['user_id'] = authUser.sub;
        let allData = await model.find({ deleted: false, ...filter, ...byUserOpt }).exec();
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
            deletedCount: updatedRes.modifiedCount,
        }
        return res
    }
}