import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { authProviders } from 'src/providers/auth/auth';
import { jwtConstants } from 'src/config/constants';
import { userProviders } from 'src/providers/user/user';
import { DbModule } from '../db/db.module';

@Module({
  imports: [
    DbModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, ...authProviders, ...userProviders],
  exports: [AuthService]
})
export class AuthModule {}
