import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import { ParentDetailsDto } from 'USER/dto/create-user-dto';
import { TransformParent } from './utils/transformParent';

@Injectable()
export class ParentService {
	constructor(private readonly dbService: DatabaseService) {}

	async getAll() {
		const result = await this.dbService.query(
			`SELECT
				users.id AS user_id,
				users.name,
				users.email,
				users.password,
				users.role_id,
				parent_details.balance AS parent_details_balance,
				parent_details.address AS parent_details_address,
				parent_details.relationship AS parent_details_relationship,
				parent_details.emergency_contact AS parent_details_emergency_contact,
				roles.id AS role_id,
				roles.name AS role_name,
				roles.description AS role_description
			FROM
				users
			JOIN
			parent_details ON users.id = parent_details.user_id
			JOIN
				roles ON users.role_id = roles.id
		`
		);

		return TransformParent.transform(result);
	}

	async getOne(user_id: number) {
		const result = await this.dbService.query(
			`SELECT
				users.id AS user_id,
				users.name,
				users.email,
				users.password,
				users.role_id,
				parent_details.balance AS parent_details_balance,
				parent_details.address AS parent_details_address,
				parent_details.relationship AS parent_details_relationship,
				parent_details.emergency_contact AS parent_details_emergency_contact,
				roles.id AS role_id,
				roles.name AS role_name,
				roles.description AS role_description
			FROM
				users
			JOIN
				parent_details ON users.id = parent_details.user_id
			JOIN
				roles ON users.role_id = roles.id
			WHERE users.id = ?
		`,
			[user_id]
		);

		return TransformParent.transform(result[0]);
	}

	async create(body: ParentDetailsDto) {
		const {
			user_id,
			balance = 0,
			address,
			relationship,
			emergency_contact,
		} = body;

		const parentResult = await this.dbService.query(
			`INSERT INTO parent_details (user_id, balance, address, relationship, emergency_contact) VALUES (?, ?, ?, ?, ?) RETURNING id`,
			[user_id, balance, address, relationship, emergency_contact]
		);

		if (!parentResult) {
			throw new NotFoundException({ message: 'User not found' });
		}

		return parentResult[0].id;
	}
}
