import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MagicStrings } from 'src/config/enums/dbmodels.enum';
import mongoose, { Model } from 'mongoose';
import { User as UserInterface } from './user.interface';
import { User as UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(MagicStrings.USER) private userModel: Model<UserInterface>
  ) {}

  create(createUserDto: CreateUserDto): Promise<UserInterface> {
    const newUser = new this.userModel(createUserDto)
    return newUser.save();
  }

  findAll(): Promise<UserInterface[]> {
    return this.userModel.find().exec();
  }

  findOne(id: mongoose.Types.ObjectId): Promise<UserInterface> {
    return this.userModel.findOne({ _id: id });
  }

  findOneBy(user: UserEntity): Promise<UserInterface> {
    return this.userModel.findOne(user);
  }

  update(id: mongoose.Types.ObjectId, updateUserDto: UpdateUserDto) {
    return this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  remove(id: mongoose.Types.ObjectId) {
    return this.userModel.deleteOne({ _id: id });
  }
}
