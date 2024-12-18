import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { categoryProviders } from 'src/providers/category/category';
import { DbModule } from '../db/db.module';
import { authProviders } from 'src/providers/auth/auth';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DbModule, AuthModule],
  controllers: [CategoriesController],
  providers: [CategoriesService, ...categoryProviders, ...authProviders],
})
export class CategoriesModule {}
