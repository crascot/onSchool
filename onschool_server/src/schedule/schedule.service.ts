import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { CreateScheduleDto } from './dto/create-schedule-dto';
import { TransformSchedule } from './utils/transformSchedule';

@Injectable()
export class ScheduleService {
	constructor(private readonly dbService: DatabaseService) {}

	async getAll() {
		const result = await this.dbService.query(
			`SELECT
				schedule.id AS schedule_id,
				schedule.day_of_week,
				classes.id AS class_id,
				classes.name AS class_name
			FROM
				schedule
			JOIN
				classes ON schedule.class_id = classes.id`
		);

		return TransformSchedule.transform(result);
	}

	async getSchedule(schedule_id: string) {
		const result = await this.dbService.query(
			`SELECT 
				schedule.id AS schedule_id,
				schedule.day_of_week,
				classes.id AS class_id,
				classes.name AS class_name
			FROM 
				schedule
			JOIN 
				classes ON schedule.class_id = classes.id
			WHERE 
				schedule.id = ?`,
			[schedule_id]
		);

		if (!result) {
			throw new NotFoundException({ message: 'schedule not found' });
		}

		return TransformSchedule.transform(result[0]);
	}

	async getScheduleByClassId(class_id: string) {
		const result = await this.dbService.query(
			`SELECT
				schedule.id AS schedule_id,
				schedule.day_of_week,
				classes.id AS class_id,
				classes.name AS class_name
			FROM
				schedule
			JOIN
				classes
			ON
				schedule.class_id = classes.id
			WHERE
				classes.id = ?`,
			[class_id]
		);

		return TransformSchedule.transform(result);
	}

	async create(body: CreateScheduleDto) {
		const { class_id, day_of_week } = body;

		return this.dbService.run(
			`INSERT INTO schedule (class_id, day_of_week) VALUES (?, ?)`,
			[class_id, day_of_week]
		);
	}

	async update(schedule_id: string, body: CreateScheduleDto) {
		const { class_id, day_of_week } = body;
		return this.dbService.run(
			'UPDATE schedule SET class_id = ?, day_of_week = ? WHERE id = ?',
			[class_id, day_of_week, schedule_id]
		);
	}

	async delete(schedule_id: string) {
		return this.dbService.run('DELETE FROM schedule WHERE id = ?', [
			schedule_id,
		]);
	}
}
