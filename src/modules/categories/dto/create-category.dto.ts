import { IsNotEmpty, MaxLength } from "class-validator";

const STR_MAX_LEN: number = 20;

export class CreateCategoryDto {
    @IsNotEmpty()
    @MaxLength(STR_MAX_LEN)
    readonly name: string;
}
