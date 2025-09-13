import { Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "DATABASE/database.service";
import { AdminDetailsDto } from "USER/dto/create-user-dto";
import { TransformAdmin } from "./utils/transformAdmin";
import { RoleEnum } from "types/role-type";

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
				roles.description AS role_description
			FROM
				users
			JOIN
				admin_details ON users.id = admin_details.user_id
			JOIN
				roles ON users.role_id = roles.id
			WHERE roles.name = '${RoleEnum.ADMIN}'
		`,
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
				roles.description AS role_description
			FROM
				users
			JOIN
				admin_details ON users.id = admin_details.user_id
			JOIN
				roles ON users.role_id = roles.id
			WHERE users.id = ? AND roles.name = '${RoleEnum.ADMIN}'
		`,
      [user_id],
    );

    return TransformAdmin.transform(result[0]);
  }

  async create(body: AdminDetailsDto) {
    const { user_id, phone } = body;

    const adminResult = await this.dbService.query(`INSERT INTO admin_details (phone, user_id) VALUES (?, ?) RETURNING id`, [phone, user_id]);

    if (!adminResult) {
      throw new NotFoundException({ message: "User not found" });
    }

    return adminResult[0].id;
  }
}
