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
    
    @IsMongoId()
    @IsOptional()
    readonly category: string;
}
