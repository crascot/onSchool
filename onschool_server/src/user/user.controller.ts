import { Body, Controller, Get, Post } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';

@Controller('user')
export class UserController {
	constructor(private readonly dbService: DatabaseService) {}

	@Get()
	async getAll() {
		return this.dbService.query('SELECT * FROM users');
	}

	@Post()
	create(@Body() body: { name: string; email: string; password: string }) {
		const { name, email, password } = body;
		return this.dbService.run(
			'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
			[name, email, password]
		);
	}
}
