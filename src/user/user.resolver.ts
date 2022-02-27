import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import Ctx from 'src/common/context.type';
import { Role } from 'src/role/model/role.schema';
import { RoleService } from 'src/role/role.service';
import { FindUserArgs } from './dto/args/find-user.arg';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User } from './model/user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  @Query(() => [User])
  async getUsers() {
    return await this.userService.findAll();
  }

  @Query(() => User)
  async getUser(@Args() user: FindUserArgs) {
    return await this.userService.findOne(user.id);
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput) {
    return await this.userService.update(input.id, input);
  }

  @ResolveField(() => Role)
  async role(@Parent() user: User) {
    return await this.roleService.findOne(user.role);
  }
}
