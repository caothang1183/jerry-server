import { Resolver } from '@nestjs/graphql';
import { User } from './model/user.schema';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}
}
