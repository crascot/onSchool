import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getAll() {
		return this.userService.getAll();
	}

	@Get(':user_id')
	async getOne(@Param('user_id') user_id: string) {
		return this.userService.getOne(user_id);
	}

	@Post()
	async create(
		@Body()
		body: CreateUserDto
	) {
		return this.userService.create(body);
	}

	@Put(':user_id')
	async update(
		@Param('user_id') user_id: string,
		@Body()
		body: UpdateUserDto
	) {
		return this.userService.update(user_id, body);
	}

	@Put(':user_id/role/:role_id')
	async changeRole(
		@Param('user_id') user_id: string,
		@Param('role_id') role_id: string
	) {
		return this.userService.changeRole(user_id, role_id);
	}

	@Delete(':user_id')
	async delete(@Param('user_id') user_id: string) {
		return this.userService.delete(user_id);
	}
}
