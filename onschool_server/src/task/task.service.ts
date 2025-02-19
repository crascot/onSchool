import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { TaskType } from 'TYPES/task-type';
import { CreateTaskDto } from './dto/create-task-dto';

@Injectable()
export class TaskService {
	private readonly tableName: string = 'tasks';

	constructor(private readonly dbService: DatabaseService) {}

	async getAll(): Promise<TaskType[]> {
		return this.dbService.query(`SELECT * FROM ${this.tableName}`);
	}

	async getOne(task_id: number): Promise<TaskType> {
		const result = await this.dbService.query(
			`SELECT * FROM ${this.tableName} WHERE id = ?`,
			[task_id]
		);

		if (result.length === 0) {
			throw new NotFoundException({
				code: HttpStatus.NOT_FOUND,
				message: 'Task not found',
			});
		}

		return result[0];
	}

	async create(body: CreateTaskDto) {
		const { task, type, status, end_at, class_id, lesson_id, student_id } =
			body;

		return this.dbService.run(
			`INSERT INTO
				${this.tableName}
				(task, type, status, end_at, class_id, lesson_id, student_id)
			VALUES
				(?, ?, ?, ?, ?, ?, ?)
			RETURNING id`,
			[task, type, status, end_at, class_id, lesson_id, student_id]
		);
	}

	async update(task_id: number, body: CreateTaskDto) {
		const { task, type, status, end_at, class_id, lesson_id, student_id } =
			body;

		return this.dbService.run(
			`UPDATE
				${this.tableName}
			SET
				task = ?,
				type = ?,
				status = ?,
				updated_at = CURRENT_TIMESTAMP,
				end_at = ?,
				class_id = ?,
				lesson_id = ?,
				student_id = ?
			WHERE id = ?`,
			[
				task,
				type,
				status,
				end_at,
				class_id,
				lesson_id,
				student_id,
				task_id,
			]
		);
	}

	async delete(task_id: number): Promise<void> {
		return this.dbService.run(
			`DELETE FROM ${this.tableName} WHERE id = ?`,
			[task_id]
		);
	}
}
