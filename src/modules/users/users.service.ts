import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MagicStrings } from 'src/config/enums/dbmodels.enum';
import mongoose, { Model } from 'mongoose';
import { User } from './user.interface';

@Injectable()
export class UsersService {
  constructor(
    @Inject(MagicStrings.USER) private userModel: Model<User>
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto)
    return newUser.save();
  }

  findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  findOne(id: mongoose.Types.ObjectId): Promise<User> {
    return this.userModel.findOne({ _id: id })
  }

  update(id: mongoose.Types.ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  remove(id: mongoose.Types.ObjectId) {
    return this.userModel.deleteOne({ _id: id })
  }
}
