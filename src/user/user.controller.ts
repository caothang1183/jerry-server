import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { UserDocument } from './model/user.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserDocument[]> {
    return this.userService.findAll();
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() user: UpdateUserInput) {
    return this.userService.update(id, user);
  }
}
