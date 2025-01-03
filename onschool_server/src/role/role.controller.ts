import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';

@Controller('role')
export class RoleController {
	constructor(private readonly dbService: DatabaseService) {}

	@Get()
	async getAllRole() {
		return this.dbService.query('SELECT * FROM roles');
	}

	@Get(':roleId')
	async getRole(@Param('roleId') roleId: string) {
		return this.dbService.query('SELECT * FROM roles WHERE id = ?', [
			roleId,
		]);
	}

	@Post()
	async create(@Body() body: { name: string; description: string }) {
		const { name, description } = body;
		return this.dbService.run(
			'INSERT INTO roles (name, description) VALUES (?, ?)',
			[name, description]
		);
	}

	@Put(':roleId')
	async update(
		@Param('roleId') roleId: string,
		@Body() body: { name: string; description: string }
	) {
		const { name, description } = body;
		return this.dbService.run(
			'UPDATE roles SET name = ?, description = ? WHERE id = ?',
			[name, description, roleId]
		);
	}

	@Delete(':roleId')
	async delete(@Param('roleId') roleId: string) {
		return this.dbService.run('DELETE FROM roles WHERE id = ?', [roleId]);
	}
}
