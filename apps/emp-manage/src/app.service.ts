import { Injectable } from '@nestjs/common';
import {} from '@nestjs/microservices';

@Injectable()
export class AppService {
  public async getHello(): Promise<string> {
    return 'Hello world';
  }
}
