import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User, UserDocument } from './model/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find();
  }

  async findOne(id: User | string): Promise<UserDocument> {
    return await this.userModel.findById(id).lean();
  }

  async findByRoleId(roleId: string): Promise<UserDocument[]> {
    return await this.userModel.find({ role: roleId }).lean();
  }

  async update(
    id: string,
    user: UpdateUserInput,
  ): Promise<UserDocument> {
    const currentUser = await this.userModel.findById(id);
    currentUser.username = user.username ? user.username : currentUser.username;
    currentUser.fullname = user.fullname ? user.fullname : currentUser.fullname;
    currentUser.email = user.email ? user.email : currentUser.email;
    currentUser.password = user.password ? user.password : currentUser.password;
    return currentUser.save();
  }
}
