import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import fileUpload from 'express-fileupload';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(fileUpload());
  await app.listen(3000);
}
bootstrap();
