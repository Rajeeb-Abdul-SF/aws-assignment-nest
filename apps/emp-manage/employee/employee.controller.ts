import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Employee } from './entities/employee.entity';

@ApiBearerAuth()
@ApiTags('employee')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  @ApiOperation({ summary: 'Create Empoyee' })
  @ApiResponse({ status: 201, description: 'Employee Model', type: Employee })
  async create(
    @Body() createEmployeeDto: CreateEmployeeDto,
  ): Promise<Employee> {
    return this.employeeService.create(createEmployeeDto);
  }

  @ApiResponse({
    status: 200,
    description: 'The found records',
    type: Employee,
  })
  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Employee,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(+id);
  }
}
