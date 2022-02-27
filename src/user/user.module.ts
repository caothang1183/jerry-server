import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from 'src/role/model/role.schema';
import { RoleService } from 'src/role/role.service';
import { User, UserSchema } from './model/user.schema';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserResolver, UserService, RoleService],
})
export class UserModule {}
