import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

const STR_MIN_LEN: number = 8;

export class SignInDTO {
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @MinLength(STR_MIN_LEN)
    readonly password: string;
}