import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role-dto";
import { RoleService } from "./role.service";

@Controller("role")
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllRole() {
    return this.roleService.getAllRole();
  }

  @HttpCode(HttpStatus.OK)
  @Get(":role_id")
  async getRole(@Param("role_id") role_id: string) {
    return this.roleService.getRole(Number(role_id));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() body: CreateRoleDto) {
    await this.roleService.create(body);

    return { code: HttpStatus.CREATED, message: "Role created" };
  }

  @HttpCode(HttpStatus.OK)
  @Put(":role_id")
  async update(@Param("role_id") role_id: string, @Body() body: CreateRoleDto) {
    await this.roleService.getRole(Number(role_id));

    await this.roleService.update(Number(role_id), body);

    return { code: HttpStatus.OK, message: "Role updated" };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":role_id")
  async delete(@Param("role_id") role_id: string) {
    await this.roleService.getRole(Number(role_id));

    await this.roleService.delete(Number(role_id));

    return { code: HttpStatus.NO_CONTENT, message: "Role deleted" };
  }
}
