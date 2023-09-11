// dynamodb.service.ts
import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
} from '@aws-sdk/client-dynamodb';

@Injectable()
export class DynamoDBService {
  private readonly client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({ region: 'us-east-1' }); // Replace with your desired AWS region.
  }

  async putItem(params: PutItemCommand['input']): Promise<void> {
    try {
      await this.client.send(new PutItemCommand(params));
    } catch (error) {
      throw new Error(`Failed to put item into DynamoDB: ${error.message}`);
    }
  }

  async getItem(params: GetItemCommand['input']): Promise<any> {
    try {
      const response = await this.client.send(new GetItemCommand(params));
      return response.Item;
    } catch (error) {
      throw new Error(`Failed to get item from DynamoDB: ${error.message}`);
    }
  }
}
