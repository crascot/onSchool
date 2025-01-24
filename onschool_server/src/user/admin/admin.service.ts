import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';

@Injectable()
export class AdminService {
	constructor(private readonly dbService: DatabaseService) {}

	async create(user_id: string, phone: string) {
		const sql = `
            INSERT INTO admin_details (user_id, created_at, last_login, phone)
            VALUES (?, ?, ?, ?)
        `;

		const params = [
			user_id,
			new Date().toISOString(),
			new Date().toISOString(),
			phone,
		];

		await this.dbService.run(sql, params);
	}
}
