import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { Routes } from 'src/config/enums/routes.enum';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signIn.dto';
import { Public } from 'src/providers/auth/auth';
import { LogInDTO } from './dto/logIn.dto';
import { Token } from './entities/token.entity';
import { Result } from 'rusting-js/enums';

@Controller(Routes.auth)
export class AuthController {
    constructor (private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    async signIn(@Body() signInDto: SignInDTO): Promise<Result<Token, string>> {
        const res = await this.authService.signIn(signInDto);
        return res.map_err((err: UnauthorizedException) => err.getResponse().toString())
    } 

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    async logIn(@Body() logInDto: LogInDTO): Promise<Token | string> {
        const res = await this.authService.logIn(logInDto.email, logInDto.password);
        if (res.is_err()) return res.unwrap_err().getResponse() as string;
        return res.unwrap();
    }
}
