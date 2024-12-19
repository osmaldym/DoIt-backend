import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DbModule } from '../db/db.module';
import { userProviders } from 'src/providers/user/user';
import { DbCallModule } from '../db-call/db-call.module';

@Module({
  imports: [DbModule, DbCallModule],
  controllers: [UsersController],
  providers: [UsersService, ...userProviders],
  exports: [UsersService]
})
export class UsersModule {}
