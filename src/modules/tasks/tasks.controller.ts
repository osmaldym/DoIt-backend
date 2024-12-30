import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import mongoose from 'mongoose';
import { Routes } from 'src/config/enums/routes.enum';
import { success } from 'src/utils/responses';
import { Success } from 'src/utils/http/success';
import { TaskDto } from './dto/task.dto';

@Controller(Routes.tasks)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Success> {
    return success(await this.tasksService.create(createTaskDto));
  }

  @Get()
  async findAll(@Query() params: TaskDto): Promise<Success> {
    return success(await this.tasksService.findAll(params));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Success> {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return success(await this.tasksService.findOne(_id));
  }

  @Get('/category/:id')
  async findAllByCategory(@Param('id') categoryId: string): Promise<Success> {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(categoryId);
    return success(await this.tasksService.findByCategory(_id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Success> {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return success(await this.tasksService.update(_id, updateTaskDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Success> {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return success(await this.tasksService.remove(_id));
  }
}
