import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { CreateScheduleDto } from './dto/create-schedule-dto';

@Injectable()
export class ScheduleService {
	constructor(private readonly dbService: DatabaseService) {}

	async getAll() {
		return this.dbService.query('SELECT * FROM schedule');
	}

	async getSchedule(schedule_id: string) {
		const result = await this.dbService.query(
			`SELECT * FROM schedule WHERE id = ${schedule_id}`
		);

		if (!result) {
			throw new NotFoundException({ message: 'schedule not found' });
		}

		return result[0];
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
