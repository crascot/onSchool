import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role-dto';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Get()
	async getAllRole() {
		return this.roleService.getAllRole();
	}

	@Get(':role_id')
	async getRole(@Param('role_id') role_id: string) {
		return this.roleService.getRole(role_id);
	}

	@Post()
	async create(@Body() body: CreateRoleDto) {
		return this.roleService.create(body);
	}

	@Post('/import')
	async createRolesFromJson() {
		return this.roleService.createRolesFromJson();
	}

	@Put(':role_id')
	async update(
		@Param('role_id') role_id: string,
		@Body() body: CreateRoleDto
	) {
		return this.roleService.update(role_id, body);
	}

	@Delete(':role_id')
	async delete(@Param('role_id') role_id: string) {
		return this.roleService.delete(role_id);
	}
}
