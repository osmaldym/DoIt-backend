import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Routes } from '../../config/enums/routes.enum'
import mongoose from 'mongoose';

@Controller(Routes.users)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id)
    return this.usersService.findOne(_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id)
    return this.usersService.update(_id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id)
    return this.usersService.remove(_id);
  }
}
