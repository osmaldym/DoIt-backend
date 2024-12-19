import { Inject, Injectable, Scope } from '@nestjs/common';
import mongoose, { Document, Model } from "mongoose"
import { exclude } from "src/config/select-excludes";
import { REQUEST } from '@nestjs/core';
import { Options } from './db-call.types';
import { excluded } from 'src/utils/mongoose';

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

    async findOne(id: mongoose.Types.ObjectId, options: Options = {byAuth: true, idKey: "user_id"}) {
        let byUserOpt = {};
        if (options.byAuth) byUserOpt[options.idKey] = this.getUserId();
        return await this.model.findOne({ _id: id, deleted: false, ...byUserOpt }).select(excluded(exclude, options.excludes));
    }

    async findAll(options: Options = {byAuth: true, idKey: "user_id"}) {
        let byUserOpt = {}
        if (options.byAuth) byUserOpt[options.idKey] = this.getUserId();
        return await this.model.find({ deleted: false, ...byUserOpt }).select(excluded(exclude, options.excludes));
    }

    async findAllBy(filter: any, options: Options = {byAuth: true, idKey: "user_id"}) {
        let byUserOpt = {};
        if (options.byAuth) byUserOpt[options.idKey] = this.getUserId();
        return await this.model.find({ deleted: false, ...filter, ...byUserOpt }).select(excluded(exclude, options.excludes));
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