import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { ClassType } from 'types/class-type';
import { CreateClassDto } from './dto/create-class-dto';

@Injectable()
export class ClassService {
	constructor(private readonly dbService: DatabaseService) {}

	async getAll() {
		return this.dbService.query('SELECT * FROM classes');
	}

	async getClass(class_id: string) {
		const result: ClassType[] = await this.dbService.query(
			`SELECT * FROM classes WHERE id = ${class_id}`
		);

		if (!result) {
			throw new NotFoundException({ message: 'class not found' });
		}

		return result[0];
	}

	async create(body: CreateClassDto) {
		const { name, school_id } = body;
		return this.dbService.run(
			`INSERT INTO classes (name, school_id) VALUES (?, ?)`,
			[name, school_id]
		);
	}

	async update(class_id: string, body: CreateClassDto) {
		const { name, school_id } = body;
		return this.dbService.run(
			'UPDATE classes SET name = ?, school_id = ? WHERE id = ?',
			[name, school_id, class_id]
		);
	}

	async delete(class_id: string) {
		return this.dbService.run('DELETE FROM classes WHERE id = ?', [
			class_id,
		]);
	}
}
