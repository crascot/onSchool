import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "DATABASE/database.service";
import { CreateSchoolDto } from "./dto/create-school-dto";

@Injectable()
export class SchoolService {
  private readonly tableName: string = "schools";

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
				${this.tableName}
			`,
    );

    return result;
  }

  async getSchool(school_id: number) {
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
				${this.tableName}
			WHERE id = ?
			`,
      [school_id],
    );

    if (result.length === 0) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: "School not found",
      });
    }

    return result[0];
  }

  async create(body: CreateSchoolDto) {
    const { name, status, address } = body;

    return this.dbService.run(`INSERT INTO ${this.tableName} (name, status, address) VALUES (?, ?, ?)`, [name, status, address]);
  }

  async update(body: CreateSchoolDto, school_id: number) {
    const { name, status, address } = body;

    return this.dbService.run(
      `UPDATE
			${this.tableName}
			SET
				name = ?,
				status = ?,
				address = ?
			WHERE id = ?`,
      [name, status, address, school_id],
    );
  }

  async delete(school_id: number): Promise<void> {
    return this.dbService.run(`DELETE FROM ${this.tableName} WHERE id = ?`, [school_id]);
  }
}
