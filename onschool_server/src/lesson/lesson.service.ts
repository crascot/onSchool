import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { CreateLessonDto } from './dto/create-lesson-dto';

@Injectable()
export class LessonService {
	constructor(private readonly dbService: DatabaseService) {}

	async getAll() {
		return this.dbService.query('SELECT * FROM lessons');
	}

	async getLesson(lesson_id: string) {
		const result = await this.dbService.query(
			`SELECT * FROM lessons WHERE id = ${lesson_id}`
		);

		if (!result) {
			throw new NotFoundException({ message: 'lesson not found' });
		}

		return result[0];
	}

	async create(body: CreateLessonDto) {
		const { subject, start_time, end_time, type, date, schedule_id } = body;
		return this.dbService.run(
			`INSERT INTO lessons (subject, start_time, end_time, type, date, schedule_id) VALUES (?, ?, ?, ?, ?, ?)`,
			[subject, start_time, end_time, type, date, schedule_id]
		);
	}

	async update(lesson_id: string, body: CreateLessonDto) {
		const { subject, start_time, end_time, type, date, schedule_id } = body;
		return this.dbService.run(
			'UPDATE lessons SET subject = ?, start_time = ?, end_time = ?, type = ?, date = ?, schedule_id WHERE id = ?',
			[subject, start_time, end_time, type, date, schedule_id, lesson_id]
		);
	}

	async delete(lesson_id: string) {
		return this.dbService.run('DELETE FROM lessons WHERE id = ?', [
			lesson_id,
		]);
	}
}
