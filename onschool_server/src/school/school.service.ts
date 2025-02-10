import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { CreateSchoolDto } from './dto/create-school-dto';

@Injectable()
export class SchoolService {
	constructor(private readonly dbService: DatabaseService) {}

	async getAll() {
		const result = await this.dbService.query(
			`
			SELECT
                schools.id AS schools_id,
                schools.name,
				schools.status,
				schools.address,
				schools.created_at,
				schools.updated_at
			FROM
				schools
			`
		);

		// return TransformLessons.transform(result);
		return result;
	}

	async create(body: CreateSchoolDto) {
		const { name, status, address } = body;

		return this.dbService.run(
			`INSERT INTO schools (name, status, address, created_at, updated_at) VALUES (?, ?, ?, ?, ?)`,
			[
				name,
				status,
				address,
				new Date().toISOString(),
				new Date().toISOString(),
			]
		);
	}
}
