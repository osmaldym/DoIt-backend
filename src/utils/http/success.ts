import { HttpStatus } from "@nestjs/common";

export class Success {
    constructor (data: any) {
        this.data = data
    }

    data: any;
    statusCode: number = HttpStatus.OK;
}