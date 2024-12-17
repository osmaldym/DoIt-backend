import { IsNotEmpty } from "class-validator";

export class PasswordDTO {
    @IsNotEmpty()
    readonly password: string;
}