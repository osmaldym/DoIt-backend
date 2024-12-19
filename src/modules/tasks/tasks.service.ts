import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.interface';
import { MagicStrings } from 'src/config/enums/dbmodels.enum';
import mongoose, { Model } from 'mongoose';
import { DbCallService } from '../db-call/db-call.service';

@Injectable()
export class TasksService {
  constructor(
    private dbCall: DbCallService,
    @Inject(MagicStrings.TASK) private tasksModel: Model<Task>
  ) { dbCall.model = tasksModel; }

  create(createTaskDto: CreateTaskDto) {
    const newTask = new this.tasksModel(createTaskDto);
    newTask.user_id = this.dbCall.getUserId();
    return newTask.save();
  }

  findAll(): Promise<Task[]> {
    return this.dbCall.findAll();
  }

  findByCategory(id: mongoose.Types.ObjectId) {
    return this.dbCall.findAllBy({ category: id });
  }

  findOne(id: mongoose.Types.ObjectId): Promise<Task> {
    return this.dbCall.findOne(id);
  }

  update(id: mongoose.Types.ObjectId, updateTaskDto: UpdateTaskDto) {
    return this.dbCall.updateOne(id, updateTaskDto);
  }

  remove(id: mongoose.Types.ObjectId) {
    return this.dbCall.softRemoveOne(id);
  }
}
