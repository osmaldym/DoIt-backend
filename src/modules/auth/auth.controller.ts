import { Body, Controller, HttpCode, HttpException, HttpStatus, Post } from '@nestjs/common';
import { Routes } from 'src/config/enums/routes.enum';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';
import { Public } from 'src/providers/auth/auth';
import { LogInDTO } from './dto/logIn.dto';
import { rustingDepending } from 'src/utils/responses';
import { Success } from 'src/utils/http/success';

@Controller(Routes.auth)
export class AuthController {
    constructor (private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(@Body() signInDto: SignInDTO): Promise<Success | HttpException> {
        return rustingDepending(await this.authService.signIn(signInDto));
    } 

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async logIn(@Body() logInDto: LogInDTO): Promise<Success | HttpException> {
        return rustingDepending(await this.authService.logIn(logInDto.email, logInDto.password));
    }
}
