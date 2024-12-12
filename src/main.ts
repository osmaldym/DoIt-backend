import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv'
import { ValidationConfig } from './config/validation.config';
config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(ValidationConfig)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
