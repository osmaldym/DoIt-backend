import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Err, Ok, Result } from 'rusting-js/enums'
import { User } from '../users/user.interface';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { SignInDTO } from './dto/signIn.dto';
import { MagicStrings } from 'src/config/enums/dbmodels.enum';
import { Token } from './entities/token.entity';
import * as bcrypt from 'bcrypt';
import { Success } from 'src/utils/http/success';
import { success } from 'src/utils/responses';

@Injectable()
export class AuthService {
    constructor (
        private userService: UsersService,
        private jwtService: JwtService,
        @Inject(MagicStrings.USER) private userModel: Model<User>,
    ) {}

    async signIn(signInDTO: SignInDTO): Promise<Result<Success, UnauthorizedException>> {
        const gettedUser: User = await this.userService.findOneBy({ email: signInDTO.email });

        if (gettedUser?.email! && !gettedUser.deleted) return Err(new UnauthorizedException('This email is already in use'));
        const salt: string = await bcrypt.genSalt();
        const encryptedPass: string = await bcrypt.hash(signInDTO.password, salt);
        
        if (gettedUser?.deleted){
            gettedUser.password = encryptedPass;
            gettedUser.deleted = false;
            gettedUser.save()
            return this.logIn(gettedUser.email, signInDTO.password)
        }

        const newUser: User = new this.userModel(signInDTO);
        newUser.password = encryptedPass;
        const userSaved = await newUser.save();

        return this.logIn(userSaved.email, signInDTO.password);
    }

    async logIn(email: string, pass: string): Promise<Result<Success, UnauthorizedException>> {
        const gettedUser: User = await this.userService.findOneBy({ email: email });

        if (!gettedUser) return Err(new UnauthorizedException("This email doesn't exist"));

        const isSamePassword: boolean = await bcrypt.compare(pass, gettedUser?.password);
        if (!isSamePassword) return Err(new UnauthorizedException('Incorrect password'));

        const payload: any = { sub: gettedUser._id, email: gettedUser.email }        
        const accessToken: string = await this.jwtService.signAsync(payload)

        return Ok(success(new Token(accessToken)))
    }
}
