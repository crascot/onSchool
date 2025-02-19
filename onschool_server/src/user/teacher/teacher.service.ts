import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { TeacherDetailsDto } from 'USER/dto/create-user-dto';
import { TransformTeacher } from './utils/transformTeacher';

@Injectable()
export class TeacherService {
	constructor(private readonly dbService: DatabaseService) {}

	async getAll() {
		const result = await this.dbService.query(
			`SELECT
				users.id AS user_id,
				users.name,
				users.email,
				users.password,
				users.role_id, 
				teacher_details.subject_specialization AS teacher_details_subject_specialization,
				teacher_details.experience_years AS teacher_details_experience_years,
				teacher_details.qualification AS teacher_details_qualification,
				teacher_details.employment_date AS teacher_details_employment_date,
				teacher_details.salary AS teacher_details_salary,
				roles.id AS role_id,
				roles.name AS role_name,
				roles.description AS role_description
			FROM
				users
			JOIN
				teacher_details ON users.id = teacher_details.user_id
			JOIN
				roles ON users.role_id = roles.id
		`
		);

		return TransformTeacher.transform(result);
	}

	async getOne(user_id: number) {
		const result = await this.dbService.query(
			`SELECT
				users.id AS user_id,
				users.name,
				users.email,
				users.password,
				users.role_id, 
				teacher_details.subject_specialization AS teacher_details_subject_specialization,
				teacher_details.experience_years AS teacher_details_experience_years,
				teacher_details.qualification AS teacher_details_qualification,
				teacher_details.employment_date AS teacher_details_employment_date,
				teacher_details.salary AS teacher_details_salary,
				roles.id AS role_id,
				roles.name AS role_name,
				roles.description AS role_description
			FROM
				users
			JOIN
				teacher_details ON users.id = teacher_details.user_id
			JOIN
				roles ON users.role_id = roles.id
			WHERE users.id = ?
		`,
			[user_id]
		);

		return TransformTeacher.transform(result[0]);
	}

	async create(body: TeacherDetailsDto) {
		const {
			user_id,
			subject_specialization,
			experience_years,
			qualification,
			salary,
		} = body;

		const result = await this.dbService.query(
			`INSERT INTO
				teacher_details
				(user_id, subject_specialization, experience_years, qualification, salary)
			VALUES
				(?, ?, ?, ?, ?)
			RETURNING
				id`,
			[
				user_id,
				subject_specialization,
				experience_years,
				qualification,
				salary,
			]
		);

		if (!result) {
			throw new NotFoundException({ message: 'User not found' });
		}

		return result[0].id;
	}
}
