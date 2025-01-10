import { Transform } from "class-transformer";
import { IsDateString, IsMongoId, IsNotEmpty, IsOptional, MaxLength } from "class-validator";

const STR_MAX_LEN: number = 5000;

export class CreateTaskDto {
    @IsNotEmpty()
    readonly title: string;

    @MaxLength(STR_MAX_LEN)
    @IsOptional()
    readonly description: string;
    
    @IsDateString()
    readonly date: string;

    @IsOptional()
    readonly completed: boolean;
    
    @IsMongoId({ each: true })
    @IsOptional()
    @Transform(({ value }) => Array.isArray(value) ? value : value.split(','), { toClassOnly: true })
    readonly categories: string[];
}
