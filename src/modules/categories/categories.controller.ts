import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Routes } from 'src/config/enums/routes.enum';
import mongoose from 'mongoose';

@Controller(Routes.categories)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return this.categoriesService.findOne(_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return this.categoriesService.update(_id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return this.categoriesService.remove(_id);
  }
}
