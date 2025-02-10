import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { CreateRoleDto } from './dto/create-role-dto';
import { RoleEnum } from 'types/role-type';

const INITIAL_ROLES: { name: RoleEnum; description: string }[] = [
	{
		name: RoleEnum.ADMIN,
		description: 'Admin',
	},
	{
		name: RoleEnum.TEACHER,
		description: 'Teacher',
	},
	{
		name: RoleEnum.PARENT,
		description: 'Parent',
	},
	{
		name: RoleEnum.STUDENT,
		description: 'Student',
	},
];

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

	async create(body: CreateRoleDto) {
		const { name, description } = body;
		return this.dbService.run(
			'INSERT INTO roles (name, description) VALUES (?, ?)',
			[name, description]
		);
	}

	async createRolesFromJson() {
		const values = INITIAL_ROLES.map(
			(role: CreateRoleDto) => `('${role.name}', '${role.description}')`
		).join(',\n');

		await this.dbService.run(
			`INSERT INTO roles (name, description) VALUES ${values}`
		);

		return { message: 'Roles initialized successfully' };
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
