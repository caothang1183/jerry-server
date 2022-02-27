import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/model/user.schema';
import { Role, RoleSchema } from './model/role.schema';
import { UserService } from 'src/user/user.service';
import { RoleResolver } from './role.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Role.name, schema: RoleSchema },
    ]),
  ],
  controllers: [RoleController],
  providers: [RoleResolver ,RoleService, UserService]
})
export class RoleModule {}
