import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';

@Injectable()
export class ParentService {
	constructor(private readonly dbService: DatabaseService) {}

	async create(
		user_id: string,
		address: string,
		relationship: string,
		emergency_contact: string,
		balance?: number
	) {
		const sql =
			balance !== undefined
				? `INSERT INTO parent_details (user_id, address, relationship, emergency_contact, balance) VALUES (?, ?, ?, ?, ?)`
				: `INSERT INTO parent_details (user_id, address, relationship, emergency_contact) VALUES (?, ?, ?, ?)`;

		const params =
			balance !== undefined
				? [user_id, address, relationship, emergency_contact, balance]
				: [user_id, address, relationship, emergency_contact];

		if (!user_id) {
			throw new Error('Invalid user_id');
		}
		if (balance !== undefined && balance < 0) {
			throw new Error('Balance cannot be negative');
		}

		await this.dbService.run(sql, params);
	}
}
