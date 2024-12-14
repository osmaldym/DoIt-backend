import { IsEmail, IsNotEmpty } from "class-validator";

export class SignInDTO {
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}