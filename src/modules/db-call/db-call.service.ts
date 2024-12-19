import { Inject, Injectable, Scope } from '@nestjs/common';
import mongoose, { Document, Model } from "mongoose"
import { preventsToShow } from "src/config/prevents";
import { REQUEST } from '@nestjs/core';

/**
 * After call in constructor, set the mongo model like:
 * ```
 * constructor(dbCall: DbCallService, ...) {
 *   dbCall.model = *yourModel*;
 * }
 * ```
 */
@Injectable({ scope: Scope.REQUEST })
export class DbCallService {
    model: Model<any>;

    constructor(@Inject(REQUEST) private readonly req: Request,) {}

    getUserId(): mongoose.Types.ObjectId {
        return this.req['user'].sub;
    }

    async findOne(id: mongoose.Types.ObjectId, byAuth: boolean = true) {
        let byUserOpt = {};
        if (byAuth) byUserOpt['user_id'] = this.getUserId();
        return await this.model.findOne({ _id: id, deleted: false, ...byUserOpt }).select(preventsToShow);
    }

    async findAll(byAuth: boolean = true) {
        let byUserOpt = {}
        if (byAuth) byUserOpt['user_id'] = this.getUserId();
        return await this.model.find({ deleted: false, ...byUserOpt }).select(preventsToShow).exec();
    }

    async findAllBy(filter: any, byAuth: boolean = true) {
        let byUserOpt = {};
        if (byAuth) byUserOpt['user_id'] = this.getUserId();
        return await this.model.find({ deleted: false, ...filter, ...byUserOpt }).select(preventsToShow).exec();
    }

    updateOne(id: mongoose.Types.ObjectId, updateData: any){
        return this.model.updateOne({ _id: id, deleted: false }, updateData);
    }

    async softRemoveOne(id: mongoose.Types.ObjectId) {
        const updatedRes = await this.model.updateOne({ _id: id, deleted: false }, { deleted: true, deletedAt: new Date() });
        const res: mongoose.mongo.DeleteResult = {
            acknowledged: updatedRes.acknowledged,
            deletedCount: updatedRes.modifiedCount,
        }
        return res
    }
}
