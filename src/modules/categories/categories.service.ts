import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MagicStrings } from 'src/config/enums/dbmodels.enum';
import mongoose, { Model } from 'mongoose';
import { Category } from './categories.interface';
import { DBCall } from 'src/utils/calls';

@Injectable()
export class CategoriesService {
  constructor(
    @Inject(MagicStrings.CATEGORY) private categoryModel: Model<Category>
  ){}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = new this.categoryModel(createCategoryDto);
    return newCategory.save();
  }

  findAll(): Promise<Category[]> {
    return DBCall.findAll(this.categoryModel);
  }

  findOne(id: mongoose.Types.ObjectId): Promise<Category> {
    return DBCall.findOne(this.categoryModel, id);
  }

  update(id: mongoose.Types.ObjectId, updateCategoryDto: UpdateCategoryDto) {
    return DBCall.updateOne(this.categoryModel, id, updateCategoryDto);
  }

  remove(id: mongoose.Types.ObjectId) {
    return DBCall.softRemoveOne(this.categoryModel, id)
  }
}
