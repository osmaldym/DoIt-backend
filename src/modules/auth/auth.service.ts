import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Err, Ok, Result } from 'rusting-js/enums'
import { User } from '../users/user.interface';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { SignInDTO } from './dto/signIn.dto';
import { MagicStrings } from 'src/config/enums/dbmodels.enum';
import { Token } from './entities/token.entity';

@Injectable()
export class AuthService { 
    constructor (
        private userService: UsersService,
        private jwtService: JwtService,
        @Inject(MagicStrings.USER) private userModel: Model<User>,
    ) {}

    async signIn(signInDTO: SignInDTO): Promise<Result<Token, UnauthorizedException>> {
        const gettedUser: User = await this.userService.findOneBy({ email: signInDTO.email });
        if (gettedUser?.email!) return Err(new UnauthorizedException('This email is already in use'));
        const newUser: User = new this.userModel(signInDTO);
        newUser.save();
        return this.logIn(newUser.email, newUser.password);
    }

    async logIn(email: string, pass: string): Promise<Result<Token, UnauthorizedException>> {
        const gettedUser: User = await this.userService.findOneBy({ email: email })

        if (!gettedUser) return Err(new UnauthorizedException("This email doesn't exist"));
        if (gettedUser?.password != pass) return Err(new UnauthorizedException('Incorrect password'));

        const payload: any = { sub: gettedUser._id, email: gettedUser.email }        
        const accessToken: string = await this.jwtService.signAsync(payload)

        return Ok(new Token(accessToken))
    }
}