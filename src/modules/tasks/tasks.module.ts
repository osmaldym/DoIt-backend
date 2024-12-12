import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DbModule } from '../db/db.module';
import { tasksProviders } from 'src/providers/tasks/tasks';

@Module({
  imports: [DbModule],
  controllers: [TasksController],
  providers: [TasksService, ...tasksProviders],
})
export class TasksModule {}
