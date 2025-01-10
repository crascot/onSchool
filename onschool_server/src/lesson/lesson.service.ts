import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { CreateLessonDto } from './dto/create-lesson-dto';
import { TransformLessons } from './utils/transformLessons';

@Injectable()
export class LessonService {
	constructor(private readonly dbService: DatabaseService) {}

	async getAll() {
		const result = await this.dbService.query(
			`
			SELECT
				lessons.id AS lessons_id,
				lessons.subject,
				lessons.start_time,
				lessons.end_time,
				lessons.type,
				lessons.date,
				schedule.id AS schedule_id,
				schedule.day_of_week,
				classes.id AS class_id,
				classes.name AS class_name
			FROM
				lessons
			JOIN
				schedule ON lessons.schedule_id = schedule.id
			JOIN
				classes ON schedule.class_id = classes.id
			`
		);

		return TransformLessons.transform(result);
	}

	async getLesson(lesson_id: string) {
		const result = await this.dbService.query(
			`
			SELECT
				lessons.id AS lessons_id,
				lessons.subject,
				lessons.start_time,
				lessons.end_time,
				lessons.type,
				lessons.date,
				schedule.id AS schedule_id,
				schedule.day_of_week,
				classes.id AS class_id,
				classes.name AS class_name
			FROM
				lessons
			JOIN
				schedule ON lessons.schedule_id = schedule.id
			JOIN
				classes ON schedule.class_id = classes.id
			WHERE
				lessons.id = ?
			`,
			[lesson_id]
		);

		if (!result) {
			throw new NotFoundException({ message: 'lesson not found' });
		}

		return TransformLessons.transform(result[0]);
	}

	async getLessonByDate(date: string) {
		const result = await this.dbService.query(
			`
			SELECT
				lessons.id AS lessons_id,
				lessons.subject,
				lessons.start_time,
				lessons.end_time,
				lessons.type,
				lessons.date,
				schedule.id AS schedule_id,
				schedule.day_of_week,
				classes.id AS class_id,
				classes.name AS class_name
			FROM
				lessons
			JOIN
				schedule ON lessons.schedule_id = schedule.id
			JOIN
				classes ON schedule.class_id = classes.id
			WHERE
				lessons.date = ?
			`,
			[date]
		);

		return TransformLessons.transform(result);
	}

	async getLessonByClassAndDate(class_id: string, date: string) {
		const result = await this.dbService.query(
			`
			SELECT
				lessons.id AS lessons_id,
				lessons.subject,
				lessons.start_time,
				lessons.end_time,
				lessons.type,
				lessons.date,
				schedule.id AS schedule_id,
				schedule.day_of_week,
				classes.id AS class_id,
				classes.name AS class_name
			FROM
				lessons
			JOIN
				schedule ON lessons.schedule_id = schedule.id
			JOIN
				classes ON schedule.class_id = classes.id
			WHERE
				classes.id = ?
			AND
				lessons.date = ?
			`,
			[class_id, date]
		);

		return TransformLessons.transform(result);
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
