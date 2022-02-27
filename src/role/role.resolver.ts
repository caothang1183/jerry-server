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
import { UserService } from 'src/user/user.service';
import { FindRoleArgs } from './dto/args/find-role.arg';
import { CreateRoleInput } from './dto/inputs/create-role.input';
import { UpdateRoleInput } from './dto/inputs/update-role.input';
import { Role, RoleDocument } from './model/role.schema';
import { RoleService } from './role.service';

@Resolver(() => Role)
export class RoleResolver {
  constructor(
    private readonly roleService: RoleService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Role)
  async createRole(@Args('input') input: CreateRoleInput) {
    return await this.roleService.create(input);
  }

  @Mutation(() => Role)
  async updateRole(@Args('input') input: UpdateRoleInput) {
    return await this.roleService.update(input.id, input);
  }

  @Query(() => [Role])
  async getRoles() {
    return await this.roleService.findAll();
  }

  @Query(() => Role)
  async getRole(@Args() role: FindRoleArgs) {
    return await this.roleService.findOne(role.id);
  }

  @ResolveField()
  async users(@Context() context: Ctx, @Parent() parent: Role) {
    const roleId = context.req.user.role;
    const role = await this.roleService.findOne(roleId);
    if (!role.isAdministrator()) throw new Error('Permission dinied');
    return await this.userService.findByRoleId(parent._id);
  }
}
