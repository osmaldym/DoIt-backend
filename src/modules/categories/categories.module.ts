import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { categoryProviders } from 'src/providers/category/category';
import { DbModule } from '../db/db.module';
import { DbCallModule } from '../db-call/db-call.module';

@Module({
  imports: [DbModule, DbCallModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, ...categoryProviders],
})
export class CategoriesModule {}
