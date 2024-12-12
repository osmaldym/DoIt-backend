import { IsNotEmpty } from "class-validator";

export class CreateCategoryDto {
    @IsNotEmpty()
    readonly name: string;
}
