import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { CreateRoleDto } from './dto/create-role-dto';

@Injectable()
export class RoleService {
	constructor(private readonly dbService: DatabaseService) {}

	async getAllRole() {
		return this.dbService.query('SELECT * FROM roles');
	}

	async getRole(role_id: string) {
		const result = await this.dbService.query(
			`SELECT * FROM roles WHERE id = ${role_id}`
		);

		if (!result) {
			throw new NotFoundException({ message: 'role not found' });
		}

		return result[0];
	}

	async getByName(name: string): Promise<number> {
		const result = await this.dbService.query(
			'SELECT id FROM roles WHERE name = ?',
			[name]
		);

		if (!result) {
			throw new NotFoundException('Role not found');
		}

		return result[0].id;
	}

	async create(body: CreateRoleDto) {
		const { name, description } = body;
		return this.dbService.run(
			'INSERT INTO roles (name, description) VALUES (?, ?)',
			[name, description]
		);
	}

	async update(role_id: string, body: CreateRoleDto) {
		const { name, description } = body;
		return this.dbService.run(
			'UPDATE roles SET name = ?, description = ? WHERE id = ?',
			[name, description, role_id]
		);
	}

	async delete(role_id: string) {
		return this.dbService.run('DELETE FROM roles WHERE id = ?', [role_id]);
	}
}
