import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { ClassType } from 'types/class-type';

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

	async create(body: { name: string }) {
		const { name } = body;
		return this.dbService.run(`INSERT INTO classes (name) VALUES (?)`, [
			name,
		]);
	}

	async update(
		class_id: string,
		body: {
			name: string;
		}
	) {
		const { name } = body;
		return this.dbService.run('UPDATE classes SET name = ? WHERE id = ?', [
			name,
			class_id,
		]);
	}

	async delete(class_id: string) {
		return this.dbService.run('DELETE FROM classes WHERE id = ?', [
			class_id,
		]);
	}
}
