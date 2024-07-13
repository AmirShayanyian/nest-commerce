import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './modules/app.module';
import { SwaggerConfigurator } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  SwaggerConfigurator(app);
  const { PORT } = process.env;
  await app.listen(PORT, () => {
    console.log(`Server Running At http://localhost:${PORT}`);
    console.log(`Swagger Running At http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
