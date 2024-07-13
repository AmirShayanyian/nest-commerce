import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function SwaggerConfigurator(app: INestApplication): void {
  const document = new DocumentBuilder()
    .setTitle('Nest Commerce')
    .setDescription('Simple E-Commerce application with nestJs implementation')
    .setVersion('v1.0.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('/swagger', app, swaggerDocument);
}
