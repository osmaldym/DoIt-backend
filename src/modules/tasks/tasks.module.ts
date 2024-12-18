import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DbModule } from '../db/db.module';
import { tasksProviders } from 'src/providers/tasks/tasks';
import { authProviders } from 'src/providers/auth/auth';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [TasksController],
  providers: [TasksService, ...tasksProviders, ...authProviders],
})
export class TasksModule {}
