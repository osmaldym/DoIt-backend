import { Inject, Injectable, Scope } from '@nestjs/common';
import mongoose, { Model } from "mongoose"
import { preventsToShow } from "src/config/prevents";
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class DbCallService {
    constructor(@Inject(REQUEST) private readonly req: Request,) {}

    getUserId(): mongoose.Types.ObjectId {
        return this.req['user'].sub;
    }

    async findOne(model: Model<any>, id: mongoose.Types.ObjectId, byAuth: boolean = true) {
        let byUserOpt = {};
        if (byAuth) byUserOpt['user_id'] = this.getUserId();
        return await model.findOne({ _id: id, deleted: false, ...byUserOpt }).select(preventsToShow);
    }

    async findAll(model: Model<any>, byAuth: boolean = true) {
        let byUserOpt = {}
        if (byAuth) byUserOpt['user_id'] = this.getUserId();
        return await model.find({ deleted: false, ...byUserOpt }).select(preventsToShow).exec();
    }

    async findAllBy(model: Model<any>, filter: any, byAuth: boolean = true) {
        let byUserOpt = {};
        if (byAuth) byUserOpt['user_id'] = this.getUserId();
        return await model.find({ deleted: false, ...filter, ...byUserOpt }).select(preventsToShow).exec();
    }

    updateOne(model: Model<any>, id: mongoose.Types.ObjectId, updateData: any){
        return model.updateOne({ _id: id, deleted: false }, updateData);
    }

    async softRemoveOne(model: Model<any>, id: mongoose.Types.ObjectId) {
        const updatedRes = await model.updateOne({ _id: id, deleted: false }, { deleted: true, deletedAt: new Date() });
        const res: mongoose.mongo.DeleteResult = {
            acknowledged: updatedRes.acknowledged,
            deletedCount: updatedRes.modifiedCount,
        }
        return res
    }
}
