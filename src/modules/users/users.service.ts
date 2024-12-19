import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MagicStrings } from 'src/config/enums/dbmodels.enum';
import mongoose, { Model } from 'mongoose';
import { User as UserInterface } from './user.interface';
import { User as UserEntity } from './entities/user.entity';
import { DbCallService } from '../db-call/db-call.service';

@Injectable()
export class UsersService {
  constructor(
    private dbCall: DbCallService,
    @Inject(MagicStrings.USER) private userModel: Model<UserInterface>
  ) {}

  create(createUserDto: CreateUserDto): Promise<UserInterface> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  findAll(): Promise<UserInterface[]> {
    return this.dbCall.findAll(this.userModel);
  }

  findOne(id: mongoose.Types.ObjectId): Promise<UserInterface> {
    return this.dbCall.findOne(this.userModel, id);
  }

  findOneBy(user: UserEntity): Promise<UserInterface> {
    return this.userModel.findOne(user);
  }

  update(id: mongoose.Types.ObjectId, updateUserDto: UpdateUserDto) {
    return this.dbCall.updateOne(this.userModel, id, updateUserDto)
  }

  remove(id: mongoose.Types.ObjectId) {
    return this.dbCall.softRemoveOne(this.userModel, id);
  }
}
