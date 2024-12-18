import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.interface';
import { MagicStrings } from 'src/config/enums/dbmodels.enum';
import mongoose, { Model } from 'mongoose';
import { DBCall } from 'src/utils/calls';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class TasksService {
  constructor(
    private authService: AuthService,
    @Inject(MagicStrings.TASK) private tasksModel: Model<Task>
  ) {}

  create(createTaskDto: CreateTaskDto) {
    const newTask = new this.tasksModel(createTaskDto);
    newTask.user_id = this.authService.getUser().sub
    return newTask.save();
  }

  findAll(): Promise<Task[]> {
    return DBCall.findAll(this.tasksModel, this.authService.getUser());
  }

  findByCategory(id: mongoose.Types.ObjectId) {
    return DBCall.findAllBy(this.tasksModel, { category: id }, this.authService.getUser());
  }

  findOne(id: mongoose.Types.ObjectId): Promise<Task> {
    return DBCall.findOne(this.tasksModel, id, this.authService.getUser());
  }

  update(id: mongoose.Types.ObjectId, updateTaskDto: UpdateTaskDto) {
    return DBCall.updateOne(this.tasksModel, id, updateTaskDto);
  }

  remove(id: mongoose.Types.ObjectId) {
    return DBCall.softRemoveOne(this.tasksModel, id);
  }
}
