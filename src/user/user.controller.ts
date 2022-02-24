import { Controller, Get } from '@nestjs/common';
import { UserDocument } from './model/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<UserDocument[]> {
    return await this.userService.findAll();
  }
}
