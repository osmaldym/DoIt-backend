import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Routes } from '../../config/enums/routes.enum'
import mongoose from 'mongoose';
import { success } from 'src/utils/responses';
import { Success } from 'src/utils/http/success';

@Controller(Routes.users)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Success> {
    return success(await this.usersService.create(createUserDto));
  }

  @Get()
  async findAll(): Promise<Success> {
    return success(await this.usersService.findAll());
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Success> {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return success(await this.usersService.findOne(_id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<Success> {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return success(await this.usersService.update(_id, updateUserDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Success> {
    const _id: mongoose.Types.ObjectId = new mongoose.Types.ObjectId(id);
    return success(await this.usersService.remove(_id));
  }
}
