import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Routes } from 'src/config/enums/routes.enum';
import mongoose from 'mongoose';
import { success } from 'src/utils/responses';
import { Success } from 'src/utils/http/success';

@Controller(Routes.categories)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto): Promise<Success> {
    return success(await this.categoriesService.create(createCategoryDto));
  }

  @Get()
  async findAll(): Promise<Success> {
    return success(await this.categoriesService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Success> {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return success(await this.categoriesService.findOne(_id));
  }

  @Put()
  async putNoId(@Body() createTaskDto: CreateCategoryDto): Promise<Success> {
    return success(await this.categoriesService.put(createTaskDto));
  }

  @Put(':id')
  async put(@Param('id') id: string, @Body() createTaskDto: CreateCategoryDto): Promise<Success> {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return success(await this.categoriesService.put(createTaskDto, _id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto): Promise<Success> {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return success(await this.categoriesService.update(_id, updateCategoryDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Success> {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return success(await this.categoriesService.remove(_id));
  }
}
