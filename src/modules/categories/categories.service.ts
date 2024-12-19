import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MagicStrings } from 'src/config/enums/dbmodels.enum';
import mongoose, { Model } from 'mongoose';
import { Category } from './categories.interface';
import { DbCallService } from '../db-call/db-call.service';

@Injectable()
export class CategoriesService {
  constructor(
    private dbCall: DbCallService,
    @Inject(MagicStrings.CATEGORY) private categoryModel: Model<Category>
  ){ dbCall.model = categoryModel; }

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = new this.categoryModel(createCategoryDto);
    newCategory.user_id = this.dbCall.getUserId();
    return newCategory.save();
  }

  findAll(): Promise<Category[]> {
    return this.dbCall.findAll();
  }

  findOne(id: mongoose.Types.ObjectId): Promise<Category> {
    return this.dbCall.findOne(id);
  }

  update(id: mongoose.Types.ObjectId, updateCategoryDto: UpdateCategoryDto) {
    return this.dbCall.updateOne(id, updateCategoryDto);
  }

  remove(id: mongoose.Types.ObjectId) {
    return this.dbCall.softRemoveOne(id);
  }
}
