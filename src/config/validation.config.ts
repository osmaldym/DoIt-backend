import { ValidationPipe } from "@nestjs/common";

export const ValidationConfig: ValidationPipe = new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
})