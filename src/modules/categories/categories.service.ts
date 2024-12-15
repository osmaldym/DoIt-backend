import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MagicStrings } from 'src/config/enums/dbmodels.enum';
import mongoose, { Model } from 'mongoose';
import { Category } from './categories.interface';

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
    return this.categoryModel.find().exec();
  }

  findOne(id: mongoose.Types.ObjectId): Promise<Category> {
    return this.categoryModel.findOne({ _id: id });
  }

  update(id: mongoose.Types.ObjectId, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.updateOne({ _id: id }, updateCategoryDto);
  }

  /**
   * @todo Create soft delete
   */
  remove(id: mongoose.Types.ObjectId) {
    return this.categoryModel.deleteOne({ _id: id });
  }
}
