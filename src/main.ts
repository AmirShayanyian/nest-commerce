import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app/app.module';
import { SwaggerConfigurator } from './configs/swagger.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerConfigurator(app);
  const { PORT } = process.env;
  await app.listen(PORT, () => {
    console.log(`Server Running At http://localhost:${PORT}`);
    console.log(`Swagger Running At http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
