import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import mongoose from 'mongoose';
import { Routes } from 'src/config/enums/routes.enum';

@Controller(Routes.tasks)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return this.tasksService.findOne(_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return this.tasksService.update(_id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return this.tasksService.remove(_id);
  }
}
