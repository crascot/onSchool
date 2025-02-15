import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { CreateGradeDto } from './dto/create-grade-dto';

@Injectable()
export class GradeService {
	constructor(private readonly dbService: DatabaseService) {}

	async getAll() {
		const result = await this.dbService.query(`SELECT * FROM grades`);

		return result;
	}

	async getGrade(grade_id: number) {
		const result = await this.dbService.query(
			`SELECT * FROM grades WHERE id  = ?`,
			[grade_id]
		);

		if (!result) {
			throw new NotFoundException({ message: 'grade not found' });
		}

		return result[0];
	}

	async create(body: CreateGradeDto) {
		const { grade, message, diary_id, lesson_id } = body;

		return this.dbService.run(
			`INSERT INTO grades (grade, message, diary_id, lesson_id) VALUES (?, ?, ?, ?)`,
			[grade, message ?? null, diary_id, lesson_id]
		);
	}

	async update(grade_id: string, body: CreateGradeDto) {
		const { grade, message, diary_id, lesson_id } = body;

		return this.dbService.run(
			'UPDATE grades SET grade = ?, message = ?, diary_id = ?, lesson_id = ? WHERE id = ?',
			[grade, message ?? null, diary_id, lesson_id, grade_id]
		);
	}

	async delete(grade_id: string) {
		return this.dbService.run('DELETE FROM grades WHERE id = ?', [
			grade_id,
		]);
	}
}
