import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './tasks.interface';
import { MagicStrings } from 'src/config/enums/dbmodels.enum';
import mongoose, { Model } from 'mongoose';
import { DbCallService } from '../db-call/db-call.service';
import { TaskDto } from './dto/task.dto';

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

  findAll(data: TaskDto): Promise<Task[]> {
    let dateFilter = {};

    if (data?.date){
      const dayToFilter = data.date.split('T')[0];
      const getted = new Date(dayToFilter);

      const tomorrow = new Date(dayToFilter);
      tomorrow.setDate(getted.getDate() + 1);

      dateFilter = { date: { $gte: getted, $lte: tomorrow } }
    }

    const final: object = {...data, ...dateFilter};

    return this.dbCall.findAll({ filter: final, excludes: "user_id" });
  }

  findByCategory(id: mongoose.Types.ObjectId) {
    return this.dbCall.findAllBy({ category: id }, { excludes: "user_id" });
  }

  findOne(id: mongoose.Types.ObjectId): Promise<Task> {
    return this.dbCall.findOne(id, { excludes: "user_id" });
  }

  update(id: mongoose.Types.ObjectId, updateTaskDto: UpdateTaskDto) {
    return this.dbCall.updateOne(id, updateTaskDto);
  }

  put(createTaskDto: CreateTaskDto, id?: mongoose.Types.ObjectId) {
    const convertedData = {...createTaskDto, categories: createTaskDto.categories.map(_id => new mongoose.Types.ObjectId(_id)) } 
    return this.dbCall.put(convertedData, id);
  }

  remove(id: mongoose.Types.ObjectId) {
    return this.dbCall.softRemoveOne(id);
  }
}
