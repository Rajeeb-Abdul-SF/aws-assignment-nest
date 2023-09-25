import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from 'apps/shared/decorators';
import { createConnection } from '@typedorm/core';
import { Organisation } from '../models/employee.model';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { myGlobalTable } from '../models/global.table';
import { DocumentClientV3 } from '@typedorm/document-client';
@Controller()
export class AppController {
  dynamoClient: DocumentClientV3;

  constructor(private readonly appService: AppService) {
    this.dynamoClient = new DocumentClientV3(
      new DynamoDBClient({
        region: process.env.AWS_REGION,
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET_KEY,
        },
      }),
    );

    createConnection({
      table: myGlobalTable,
      entities: [Organisation],
      documentClient: this.dynamoClient,
    });
  }

  @Public()
  @Get()
  async getHello(): Promise<string> {
    const helloValue = await this.appService.getHello();
    return helloValue;
  }
}
