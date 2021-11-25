import { Controller, Post } from '@nestjs/common';
import { Context } from '@nestjs/graphql';
import Ctx from 'src/common/context.type';
import { ConfirmUserInput } from './dto/inputs/confirm-user.input';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { LoginUserInput } from './dto/inputs/login-user.input';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('/register')
  async registerUser(input: CreateUserInput) {
    return await this.userService.createUser(input);
  }

  @Post('/verify-email')
  async confirmUser(input: ConfirmUserInput) {
    return await this.userService.confirmUser(input);
  }

  @Post('/login')
  async login(input: LoginUserInput, @Context() context: Ctx) {
    return await this.userService.login(input, context);
  }
}
