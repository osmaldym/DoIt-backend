import { IsEmail, IsNotEmpty } from "class-validator";

export class LogInDTO {
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}