import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { CreateRoleDto } from './dto/create-role-dto';

@Injectable()
export class RoleService {
	private readonly tableName: string = 'roles';

	constructor(private readonly dbService: DatabaseService) {}

	async getAllRole() {
		return this.dbService.query(`SELECT * FROM ${this.tableName}`);
	}

	async getRole(role_id: number) {
		const result = await this.dbService.query(
			`SELECT * FROM ${this.tableName} WHERE id = ?`,
			[role_id]
		);

		if (result.length === 0) {
			throw new NotFoundException({
				code: HttpStatus.NOT_FOUND,
				message: 'Role not found',
			});
		}

		return result[0];
	}

	async getByName(name: string): Promise<number> {
		const result = await this.dbService.query(
			`SELECT id FROM ${this.tableName} WHERE name = ?`,
			[name]
		);

		if (result.length === 0) {
			throw new NotFoundException({
				code: HttpStatus.NOT_FOUND,
				message: 'Role not found',
			});
		}

		return result[0].id;
	}

	async create(body: CreateRoleDto) {
		const { name, description } = body;
		return this.dbService.run(
			`INSERT INTO ${this.tableName} (name, description) VALUES (?, ?)`,
			[name, description]
		);
	}

	async update(role_id: number, body: CreateRoleDto) {
		const { name, description } = body;
		return this.dbService.run(
			`UPDATE ${this.tableName} SET name = ?, description = ? WHERE id = ?`,
			[name, description, role_id]
		);
	}

	async delete(role_id: number) {
		return this.dbService.run(
			`DELETE FROM ${this.tableName} WHERE id = ?`,
			[role_id]
		);
	}
}
