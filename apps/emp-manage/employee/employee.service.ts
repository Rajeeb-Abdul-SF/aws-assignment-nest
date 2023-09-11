import {
  BadRequestException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { Employee } from './entities/employee.entity';
@Injectable()
export class EmployeeService {
  dynamoClient: DynamoDBClient;
  constructor() {
    this.dynamoClient = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
  }

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    const { email, name } = createEmployeeDto;
    const id = Date.now();
    const itemData = {
      TableName: process.env.AWS_DB,
      Item: {
        id: { S: id.toString() },
        name: { S: name },
        email: { S: email },
      },
    };
    const putItemCommand = new PutItemCommand(itemData);
    try {
      await this.dynamoClient.send(putItemCommand);
      return { name, email, id };
    } catch (error) {
      if (error.name === 'TypeError') {
        throw new UnprocessableEntityException(error.message);
      } else if (
        error.name === 'ValidationException' ||
        error.name === 'TypeError'
      ) {
        throw new UnprocessableEntityException(error.message);
      } else {
        throw new BadRequestException(error.message);
      }
    }
  }

  findAll() {
    return `This action returns all employee`;
  }

  findOne(id: number) {
    return `This action returns a #${id} employee`;
  }
}
