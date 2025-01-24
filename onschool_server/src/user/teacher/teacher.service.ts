import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';

@Injectable()
export class TeacherService {
	constructor(private readonly dbService: DatabaseService) {}

	async create(
		user_id: string,
		subject_specialization: string,
		experience_years: number,
		qualification: string,
		salary: number
	) {
		const sql = `INSERT INTO teacher_details (user_id, subject_specialization, experience_years, qualification, employment_date, salary) VALUES (?, ?, ?, ?, ?, ?)`;

		const params = [
			user_id,
			subject_specialization,
			experience_years,
			qualification,
			new Date().toISOString(),
			salary,
		];

		if (!user_id) {
			throw new Error('Invalid user_id');
		}

		await this.dbService.run(sql, params);
	}
}
