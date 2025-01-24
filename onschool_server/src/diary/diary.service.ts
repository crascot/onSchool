import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { CreateDiaryDto } from './dto/create-diary-dto';

@Injectable()
export class DiaryService {
	constructor(private readonly dbService: DatabaseService) {}

	async getAll() {
		return this.dbService.query('SELECT * FROM diaries');
	}

	async getDiary(diary_id: string) {
		const result = await this.dbService.query(
			`SELECT * FROM diaries WHERE id = ${diary_id}`
		);

		if (!result) {
			throw new NotFoundException({ message: 'diary not found' });
		}

		return result[0];
	}

	async create(body: CreateDiaryDto) {
		const { student_id } = body;
		return this.dbService.run(
			`INSERT INTO diaries (student_id) VALUES (?)`,
			[student_id]
		);
	}

	async createAndReturnId(body: CreateDiaryDto) {
		const { student_id } = body;
		return this.dbService.query(
			`INSERT INTO diaries (student_id) VALUES (?) RETURNING id`,
			[student_id]
		);
	}

	async update(diary_id: string, body: CreateDiaryDto) {
		const { student_id } = body;
		return this.dbService.run(
			'UPDATE diaries SET student_id = ? WHERE id = ?',
			[student_id, diary_id]
		);
	}

	async delete(diary_id: string) {
		return this.dbService.run('DELETE FROM diaries WHERE id = ?', [
			diary_id,
		]);
	}
}
