import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

describe('EmployeeController', () => {
  let controller: EmployeeController;
  let employeeService: EmployeeService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeeController],
      providers: [EmployeeService],
    }).compile();

    controller = module.get<EmployeeController>(EmployeeController);
    employeeService = module.get<EmployeeService>(EmployeeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should handle validation failure', async () => {
    const createEmployeeDto: CreateEmployeeDto = {
      name: '',
      email: 'john@example.com',
    };

    const validationError: Error = new Error('Validation failed');
    validationError['response'] = {
      statusCode: 400,
      message: ['name must be a string', 'name should not be empty'],
      error: 'Bad Request',
    };
    jest.spyOn(employeeService, 'create').mockRejectedValue(validationError);

    try {
      await controller.create(createEmployeeDto);
    } catch (error) {
      expect(error.response.statusCode).toBe(400);
      expect(error.response.error).toBe('Bad Request');
      expect(error.response.message).toContain('name must be a string');
      expect(error.response.message).toContain('name should not be empty');
    }
  });
});
