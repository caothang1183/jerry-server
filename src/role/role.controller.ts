import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleInput } from './dto/inputs/create-role.input';
import { UpdateRoleInput } from './dto/inputs/update-role.input';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body() role: CreateRoleInput) {
    return this.roleService.create(role);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() role: UpdateRoleInput) {
    return this.roleService.update(id, role);
  }

  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
