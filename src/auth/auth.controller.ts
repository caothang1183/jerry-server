import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserInput } from './dto/inputs/login-user.input';
import { RegisterUserInput } from './dto/inputs/register-user.input';
import { VerifyEmailInput } from './dto/inputs/verify-email.input';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async registerUser(@Body() data: RegisterUserInput) {
    return await this.authService.createUser(data);
  }

  @Post('/verify-email')
  async confirmUser(@Body() data: VerifyEmailInput) {
    return await this.authService.confirmUser(data);
  }

  @Post('/login')
  async login(@Body() data: LoginUserInput) {
    return await this.authService.loginApi(data);
  }
}
