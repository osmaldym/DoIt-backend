import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.interface';
import { MagicStrings } from 'src/config/enums/dbmodels.enum';
import mongoose, { Model } from 'mongoose';
import { DBCall } from 'src/utils/calls';

@Injectable()
export class TasksService {
  constructor(
    @Inject(MagicStrings.TASK) private tasksModel: Model<Task>
  ) {}

  create(createTaskDto: CreateTaskDto) {
    const newTask = new this.tasksModel(createTaskDto);
    return newTask.save();
  }

  findAll(): Promise<Task[]> {
    return DBCall.findAll(this.tasksModel);
  }

  findByCategory(id: mongoose.Types.ObjectId) {
    return this.tasksModel.find({ category: id, isDeleted: false });
  }

  findOne(id: mongoose.Types.ObjectId): Promise<Task> {
    return DBCall.findOne(this.tasksModel, id);
  }

  update(id: mongoose.Types.ObjectId, updateTaskDto: UpdateTaskDto) {
    return DBCall.updateOne(this.tasksModel, id, updateTaskDto);
  }

  remove(id: mongoose.Types.ObjectId) {
    return DBCall.softRemoveOne(this.tasksModel, id);
  }
}
