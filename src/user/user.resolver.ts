import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import Ctx from 'src/common/context.type';
import { ConfirmUserInput } from './dto/inputs/confirm-user.input';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { LoginUserInput } from './dto/inputs/login-user.input';
import { User } from './model/user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async registerUser(@Args('input') input: CreateUserInput) {
    return await this.userService.createUser(input);
  }

  @Mutation(() => User)
  async confirmUser(@Args('input') input: ConfirmUserInput) {
    return await this.userService.confirmUser(input);
  }

  @Mutation(() => User)
  async login(@Args('input') input: LoginUserInput, @Context() context: Ctx) {
    return await this.userService.login(input, context);
  }

  @Query(() => User, { nullable: true })
  async me(@Context() context: Ctx) {
    return context.req.user;
  }
}
