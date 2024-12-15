import { Result } from "rusting-js/enums";
import { Success } from "./http/success";
import { HttpException } from "@nestjs/common";

export function success(data: any): Success {
    return new Success(data);
}

export function rustingDepending(result: Result<Success, HttpException>): Success | HttpException {
    return result.unwrap_or_else((err) => { throw err });
}