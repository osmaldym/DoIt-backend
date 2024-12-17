import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Patch, Post, UseGuards } from '@nestjs/common';
import { Routes } from 'src/config/enums/routes.enum';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';
import { Public } from 'src/providers/auth/auth';
import { LogInDTO } from './dto/logIn.dto';
import { rustingDepending, success } from 'src/utils/responses';
import { Success } from 'src/utils/http/success';
import { PasswordDTO } from './dto/password.dto';

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

    @Get('profile')
    async profile(): Promise<Success> {
        return success(this.authService.profile());
    }

    @Patch('profile/edit-password')
    async editPassword(@Body() passwordDto: PasswordDTO): Promise<Success | HttpException> {
        return success(await this.authService.editPassword(passwordDto.password));
    }
}
