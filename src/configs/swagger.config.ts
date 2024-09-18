import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export function SwaggerConfigurator(app: INestApplication): void {
  const document = new DocumentBuilder()
    .setTitle('Nest Commerce')
    .setDescription('Simple E-Commerce application with nestJs implementation')
    .addBearerAuth(SwaggerAuthConfig(), 'Authorization')
    .setVersion('v1.0.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, document);
  SwaggerModule.setup('/swagger', app, swaggerDocument);
}
function SwaggerAuthConfig(): SecuritySchemeObject {
  return {
    type: 'http',
    bearerFormat: 'JWT',
    in: 'header',
    scheme: 'bearer',
  };
}
