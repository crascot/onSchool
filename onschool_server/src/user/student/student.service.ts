import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { StudentDetailsDto } from 'USER/dto/create-user-dto';
import { TransformStudent } from './utils/transformStudent';

@Injectable()
export class StudentService {
	constructor(private readonly dbService: DatabaseService) {}

	async getAll() {
		const result = await this.dbService.query(
			`SELECT 
				users.id AS user_id,
				users.name,
				users.email,
				users.password,
				users.role_id,
				roles.name AS role_name,
				roles.description AS role_description,
				student_details.class_id AS classes_id,
				classes.name AS classes_name,
				classes.school_id AS schools_id,
				schools.name AS schools_name,
				schools.status AS schools_status,
				schools.address AS schools_address,
				schools.created_at AS schools_created_at,
				schools.updated_at AS schools_updated_at,
				parent_details.user_id AS parent_user_id,
				parent_users.name AS parent_name,
				parent_users.email AS parent_email,
				parent_details.address AS parent_address,
				parent_details.relationship AS parent_relationship,
				parent_details.emergency_contact AS parent_emergency_contact
			FROM users
			JOIN roles ON users.role_id = roles.id
			JOIN student_details ON users.id = student_details.user_id
			JOIN classes ON student_details.class_id = classes.id
			JOIN schools ON classes.school_id = schools.id
			JOIN parent_details ON student_details.parent_id = parent_details.id
			JOIN users AS parent_users ON parent_details.user_id = parent_users.id
		  `
		);

		return TransformStudent.transform(result);
	}
	async getOne(user_id: number) {
		const result = await this.dbService.query(
			`SELECT 
				users.id AS user_id,
				users.name,
				users.email,
				users.password,
				users.role_id,
				roles.name AS role_name,
				roles.description AS role_description,
				student_details.class_id AS classes_id,
				classes.name AS classes_name,
				classes.school_id AS schools_id,
				schools.name AS schools_name,
				schools.status AS schools_status,
				schools.address AS schools_address,
				schools.created_at AS schools_created_at,
				schools.updated_at AS schools_updated_at,
				parent_details.user_id AS parent_user_id,
				parent_users.name AS parent_name,
				parent_users.email AS parent_email,
				parent_details.address AS parent_address,
				parent_details.relationship AS parent_relationship,
				parent_details.emergency_contact AS parent_emergency_contact
			FROM users
			JOIN roles ON users.role_id = roles.id
			JOIN student_details ON users.id = student_details.user_id
			JOIN classes ON student_details.class_id = classes.id
			JOIN schools ON classes.school_id = schools.id
			JOIN parent_details ON student_details.parent_id = parent_details.id
			JOIN users AS parent_users ON parent_details.user_id = parent_users.id
			WHERE users.id = ?
		  `,
			[user_id]
		);

		return TransformStudent.transform(result[0]);
	}
	async create(body: StudentDetailsDto) {
		const { user_id, class_id, parent_id } = body;

		const studentResult = await this.dbService.query(
			`INSERT INTO student_details (user_id, class_id, parent_id) VALUES (?, ?, ?) RETURNING id`,
			[user_id, class_id, parent_id]
		);

		if (!studentResult) {
			throw new NotFoundException({ message: 'User not found' });
		}

		return studentResult[0].id;
	}
}
