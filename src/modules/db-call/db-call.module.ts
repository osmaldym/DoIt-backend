import { Module, forwardRef } from '@nestjs/common';
import { DbCallService } from './db-call.service';

@Module({
  providers: [DbCallService],
  exports: [DbCallService]
})
export class DbCallModule {}
