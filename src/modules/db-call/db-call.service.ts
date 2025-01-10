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

    async findOne(id: mongoose.Types.ObjectId, options?: Options) {
        options = {byAuth: true, existIdKey: true, idKey: "user_id", ...options}
        let byUserOpt = {};
        if (options.byAuth) {
            const data = [{[options.idKey]: { $exists: options.existIdKey }}, {[options.idKey]: this.getUserId()}]
            byUserOpt = options.existIdKey ? {$and: data} : {$or: data}
        }
        return await this.model.findOne({ _id: id, deleted: false, ...byUserOpt }).select(excluded(exclude, options.excludes));
    }

    async findAll(options?: Options) {
        options = {byAuth: true, existIdKey: true, idKey: "user_id", ...options}
        let byUserOpt = {};
        if (options.byAuth) {
            const data = [{[options.idKey]: { $exists: options.existIdKey }}, {[options.idKey]: this.getUserId()}]
            byUserOpt = options.existIdKey ? {$and: data} : {$or: data}
        }
        return await this.model.find({ deleted: false, ...byUserOpt, ...options.filter }).select(excluded(exclude, options.excludes));
    }

    async findAllBy(filter: object, options?: Options) {
        options = {byAuth: true, existIdKey: true, idKey: "user_id", ...options}
        let byUserOpt = {};
        if (options.byAuth) {
            const data = [{[options.idKey]: { $exists: options.existIdKey }}, {[options.idKey]: this.getUserId()}]
            byUserOpt = options.existIdKey ? {$and: data} : {$or: data}
        }
        return await this.model.find({ deleted: false, ...filter, ...byUserOpt }).select(excluded(exclude, options.excludes));
    }

    updateOne(id: mongoose.Types.ObjectId, updateData: object) {
        return this.model.findOneAndUpdate({ _id: id, deleted: false }, updateData);
    }

    put(data: object, id?: mongoose.Types.ObjectId) {
        const finalData = {
            ...data,
            "user_id": this.getUserId(),
        }

        if (!id) id = new mongoose.mongo.ObjectId();
        
        return this.model.findByIdAndUpdate(id, finalData, { upsert: true, new: true, setDefaultsOnInsert: true });
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