import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { AdminDetailsDto } from 'USER/dto/create-user-dto';
import { TransformAdmin } from './utils/transformAdmin';

@Injectable()
export class AdminService {
	constructor(private readonly dbService: DatabaseService) {}

	async getAll() {
		const result = await this.dbService.query(
			`SELECT
				users.id AS user_id,
				users.name,
				users.email,
				users.password,
				users.role_id, 
				admin_details.created_at AS admin_details_created_at,
				admin_details.last_login AS admin_details_last_login,
				admin_details.phone AS admin_details_phone,
				roles.id AS role_id,
				roles.name AS role_name,
				roles.description AS role_description,
				schools.id AS schools_id,
				schools.name AS school_name,
				schools.status AS school_status,
				schools.address AS school_address,
				schools.created_at AS school_created_at,
				schools.updated_at AS school_updated_at
			FROM
				users
			JOIN
				admin_details ON users.id = admin_details.user_id
			JOIN
				roles ON users.role_id = roles.id
			LEFT JOIN
				schools ON admin_details.school_id = schools.id
		`
		);

		return TransformAdmin.transform(result);
	}

	async getOne(user_id: number) {
		const result = await this.dbService.query(
			`SELECT
				users.id AS user_id,
				users.name,
				users.email,
				users.password,
				users.role_id, 
				admin_details.created_at AS admin_details_created_at,
				admin_details.last_login AS admin_details_last_login,
				admin_details.phone AS admin_details_phone,
				roles.id AS role_id,
				roles.name AS role_name,
				roles.description AS role_description,
				schools.id AS schools_id,
				schools.name AS school_name,
				schools.status AS school_status,
				schools.address AS school_address,
				schools.created_at AS school_created_at,
				schools.updated_at AS school_updated_at
			FROM
				users
			JOIN
				admin_details ON users.id = admin_details.user_id
			JOIN
				roles ON users.role_id = roles.id
			LEFT JOIN
				schools ON admin_details.school_id = schools.id
			WHERE users.id = ?
		`,
			[user_id]
		);

		return TransformAdmin.transform(result[0]);
	}

	async create(body: AdminDetailsDto) {
		const { user_id, phone, school_id } = body;

		const adminResult = await this.dbService.query(
			`INSERT INTO admin_details (created_at, last_login, phone, user_id, school_id) VALUES (?, ?, ?, ?, ?) RETURNING id`,
			[
				new Date().toISOString(),
				new Date().toISOString(),
				phone,
				user_id,
				school_id,
			]
		);

		if (!adminResult) {
			throw new NotFoundException({ message: 'User not found' });
		}

		return adminResult[0].id;
	}
}
