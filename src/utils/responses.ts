import { Result } from "rusting-js/enums";
import { Success } from "./http/success";
import { HttpException } from "@nestjs/common";
import mongoose from "mongoose";

export function success(data: any): Success {
    return new Success(data);
}

export function rustingDepending(result: Result<Success, HttpException>): Success | HttpException {
    return result.unwrap_or_else((err) => { throw err });
}

export function deleteAts(el: mongoose.Document) {
    let data = el.toJSON()
    delete data.deletedAt;
    delete data.createdAt;
    delete data.updatedAt;
    delete data.deleted;
    delete data.password;
    return data;
}