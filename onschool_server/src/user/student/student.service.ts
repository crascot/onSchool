import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';

@Injectable()
export class StudentService {
	constructor(private readonly dbService: DatabaseService) {}

	async create(user_id: string, class_id: string, parent_id: number) {
		const sql = `
		    INSERT INTO student_details (user_id, class_id, parent_id)
		    VALUES (?, ?, ?)
		`;
		const params = [user_id, class_id, parent_id];
		await this.dbService.run(sql, params);
	}
}
