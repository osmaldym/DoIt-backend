import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.interface';
import { MagicStrings } from 'src/config/enums/dbmodels.enum';
import mongoose, { Model } from 'mongoose';

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
    return this.tasksModel.find().exec();
  }

  findOne(id: mongoose.Types.ObjectId): Promise<Task> {
    return this.tasksModel.findOne({ _id: id })
  }

  update(id: mongoose.Types.ObjectId, updateTaskDto: UpdateTaskDto) {
    return this.tasksModel.updateOne({ _id: id }, updateTaskDto);
  }

  remove(id: mongoose.Types.ObjectId) {
    return this.tasksModel.deleteOne({ _id: id })
  }
}
