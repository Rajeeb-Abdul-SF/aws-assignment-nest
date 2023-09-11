import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'apps/shared/decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  async getHello(): Promise<string> {
    const helloValue = await this.appService.getHello();
    return helloValue;
  }
}
