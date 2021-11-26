import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import Ctx from 'src/common/context.type';
import { VerifyEmailInput } from './dto/inputs/verify-email.input';
import { RegisterUserInput } from './dto/inputs/register-user.input';
import { LoginUserInput } from './dto/inputs/login-user.input';
import { User } from '../user/model/user.schema';
import { AuthService } from './auth.service';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async registerUser(@Args('input') input: RegisterUserInput) {
    return await this.authService.createUser(input);
  }

  @Mutation(() => User)
  async confirmUser(@Args('input') input: VerifyEmailInput) {
    return await this.authService.confirmUser(input);
  }

  @Mutation(() => User)
  async login(@Args('input') input: LoginUserInput, @Context() context: Ctx) {
    return await this.authService.login(input, context);
  }

  @Query(() => User, { nullable: true })
  async me(@Context() context: Ctx) {
    return context.req.user;
  }
}
