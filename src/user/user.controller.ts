import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create() {
    return 'Hello';
  }

  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.getAll();
  }
}
