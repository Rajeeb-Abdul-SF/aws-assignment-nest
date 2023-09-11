import { Injectable } from '@nestjs/common';

export type User = { userId: number; email: string };

@Injectable()
export class UserService {
  private readonly users = [
    {
      userId: 1,
      email: 'rajeeb.abdul@sourcefuse.com',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
