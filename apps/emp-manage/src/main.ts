import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AuthGuard } from 'apps/shared/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { ValidationPipe } from '@nestjs/common';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Employee Service')
    .setDescription('The Employee API description')
    .setVersion('1.0')
    .addTag('Employee')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const reflector = app.get(Reflector);
  const jwtService = new JwtService();
  app.useGlobalGuards(new AuthGuard(jwtService, reflector));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
