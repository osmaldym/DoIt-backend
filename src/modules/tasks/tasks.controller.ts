import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
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

  @Get('search/')
  async search(
    @Query() filter: UpdateTaskDto, 
    ): Promise<Success> {
    return success(await this.tasksService.findAllBy(filter));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Success> {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return success(await this.tasksService.findOne(_id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Success> {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return success(await this.tasksService.update(_id, updateTaskDto));
  }

  @Put()
  async putNoId(@Body() createTaskDto: CreateTaskDto): Promise<Success> {
    return success(await this.tasksService.put(createTaskDto));
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() createTaskDto: CreateTaskDto): Promise<Success> {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return success(await this.tasksService.put(createTaskDto, _id));
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Success> {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return success(await this.tasksService.remove(_id));
  }
}
