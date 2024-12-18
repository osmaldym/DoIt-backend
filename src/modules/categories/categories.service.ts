import { Inject, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MagicStrings } from 'src/config/enums/dbmodels.enum';
import mongoose, { Model } from 'mongoose';
import { Category } from './categories.interface';
import { DBCall } from 'src/utils/calls';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CategoriesService {
  constructor(
    private authService: AuthService,
    @Inject(MagicStrings.CATEGORY) private categoryModel: Model<Category>
  ){}

  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = new this.categoryModel(createCategoryDto);
    newCategory.user_id = this.authService.getUser().sub;
    return newCategory.save();
  }

  findAll(): Promise<Category[]> {
    return DBCall.findAll(this.categoryModel, this.authService.getUser());
  }

  findOne(id: mongoose.Types.ObjectId): Promise<Category> {
    return DBCall.findOne(this.categoryModel, id, this.authService.getUser());
  }

  update(id: mongoose.Types.ObjectId, updateCategoryDto: UpdateCategoryDto) {
    return DBCall.updateOne(this.categoryModel, id, updateCategoryDto);
  }

  remove(id: mongoose.Types.ObjectId) {
    return DBCall.softRemoveOne(this.categoryModel, id)
  }
}
