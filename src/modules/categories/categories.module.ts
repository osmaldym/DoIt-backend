import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { categoryProviders } from 'src/providers/category/category';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, ...categoryProviders],
})
export class CategoriesModule {}
