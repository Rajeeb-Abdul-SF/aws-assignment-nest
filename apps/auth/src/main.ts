import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { AuthModule } from './auth.module';

const logger = new Logger('Auth');

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: Transport.TCP,
    options: {
      port: 3001,
    },
  });
  await app
    .listen()
    .then(() => logger.log('Auth Micro service is listern port 3001'));
}
bootstrap();
