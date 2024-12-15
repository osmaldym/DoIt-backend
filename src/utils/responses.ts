import { Result } from "rusting-js/enums";
import { Success } from "./http/success";
import { HttpException } from "@nestjs/common";

export function success(data: any): Success {
    return new Success(data);
}

/** 
 * @todo Use best practices for rusting library
 */
export function rustingDepending(result: Result<Success, HttpException>): Success | HttpException {
    if (result.is_err()) throw result.unwrap_err();
    return result.unwrap()
}