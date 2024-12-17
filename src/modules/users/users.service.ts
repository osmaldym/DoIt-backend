import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MagicStrings } from 'src/config/enums/dbmodels.enum';
import mongoose, { Model } from 'mongoose';
import { User as UserInterface } from './user.interface';
import { User as UserEntity } from './entities/user.entity';
import { DBCall } from 'src/utils/calls';

@Injectable()
export class UsersService {
  constructor(
    @Inject(MagicStrings.USER) private userModel: Model<UserInterface>
  ) {}

  create(createUserDto: CreateUserDto): Promise<UserInterface> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  findAll(): Promise<UserInterface[]> {
    return DBCall.findAll(this.userModel);
  }

  findOne(id: mongoose.Types.ObjectId): Promise<UserInterface> {
    return DBCall.findOne(this.userModel, id);
  }

  findOneBy(user: UserEntity): Promise<UserInterface> {
    return this.userModel.findOne(user);
  }

  update(id: mongoose.Types.ObjectId, updateUserDto: UpdateUserDto) {
    return DBCall.updateOne(this.userModel, id, updateUserDto)
  }

  remove(id: mongoose.Types.ObjectId) {
    return DBCall.softRemoveOne(this.userModel, id);
  }
}
