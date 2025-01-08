import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UserService {
	constructor(private readonly dbService: DatabaseService) {}

	async getAll() {
		return this.dbService.query('SELECT * FROM users');
	}

	async getOne(user_id: string) {
		const result = await this.dbService.query(
			`SELECT * FROM users WHERE id = ${user_id}`
		);

		if (!result) {
			throw new NotFoundException({ message: 'user not found' });
		}

		return result[0];
	}

	async create(body: CreateUserDto) {
		const { name, email, password, role_id } = body;
		return this.dbService.run(
			`INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)`,
			[name, email, password, role_id]
		);
	}

	async update(user_id: string, body: UpdateUserDto) {
		const { name, email, password } = body;
		return this.dbService.run(
			'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
			[name, email, password, user_id]
		);
	}

	async changeRole(user_id: string, role_id: string) {
		return this.dbService.run('UPDATE users SET role_id = ? WHERE id = ?', [
			role_id,
			user_id,
		]);
	}

	async delete(user_id: string) {
		return this.dbService.run('DELETE FROM users WHERE id = ?', [user_id]);
	}
}
