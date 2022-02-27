import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRoleInput } from './dto/inputs/create-role.input';
import { UpdateRoleInput } from './dto/inputs/update-role.input';
import { Role, RoleDocument } from './model/role.schema';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  async findAll() {
    return await this.roleModel.find().lean();
  }

  async findOne(id: Role | string): Promise<RoleDocument> {
    return await this.roleModel.findById(id);
  }

  async findOneByName(name: string): Promise<RoleDocument> {
    return await this.roleModel.findOne({ name }).lean();
  }

  async create(input: CreateRoleInput): Promise<RoleDocument> {
    const createdRole = new this.roleModel(input);
    return await createdRole.save();
  }

  async update(id: string, role: UpdateRoleInput): Promise<RoleDocument> {
    const currentRole = await this.roleModel.findById(id);
    currentRole.name = role.name ? role.name : currentRole.name;
    currentRole.description = role.description ? role.description : currentRole.description;
    return await currentRole.save();
  }

  async remove(id: Role | string): Promise<RoleDocument> {
    const removedRole = await this.roleModel.remove({ _id: id });
    return removedRole;
  }
}
