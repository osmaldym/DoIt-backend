import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DbModule } from '../db/db.module';
import { userProviders } from 'src/providers/user/user';

@Module({
  imports: [DbModule],
  controllers: [UsersController],
  providers: [UsersService, ...userProviders],
  exports: [UsersService]
})
export class UsersModule {}
