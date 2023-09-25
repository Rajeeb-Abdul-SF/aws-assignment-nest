import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Organisation } from '../models/employee.model';
import { EntityManager, getEntityManager } from '@typedorm/core';
@Injectable()
export class EmployeeService {
  org = new Organisation();
  entityManger: EntityManager;

  async create(createEmployeeDto: CreateEmployeeDto): Promise<Organisation> {
    this.entityManger = getEntityManager();

    this.org.email = createEmployeeDto.email;
    this.org.name = createEmployeeDto.name;
    this.org.active = true;
    this.org.status = 'PENDING_APPROVAL';

    return this.entityManger.create(this.org);
  }

  findAll() {
    this.entityManger = getEntityManager();

    return this.entityManger.findOne(Organisation, {
      id: '5f0cea4a-7a53-4796-a0b0-14623f0be41b',
    });
  }

  findOne(id: number) {
    return `${id}`;
  }
}
