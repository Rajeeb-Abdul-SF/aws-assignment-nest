import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from '../employee/employee.module';
import { JwtService } from '@nestjs/jwt';

import { AuthModule } from 'apps/auth/src/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'apps/shared/auth/auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [EmployeeModule, AuthModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [
    AppService,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
