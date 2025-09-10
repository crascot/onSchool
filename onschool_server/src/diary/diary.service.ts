import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "DATABASE/database.service";
import { CreateDiaryDto } from "./dto/create-diary-dto";

@Injectable()
export class DiaryService {
  private readonly tableName: string = "diaries";

  constructor(private readonly dbService: DatabaseService) {}

  async getAll() {
    return this.dbService.query(`SELECT * FROM ${this.tableName}`);
  }

  async getDiary(diary_id: number) {
    const result = await this.dbService.query(`SELECT * FROM ${this.tableName} WHERE id = ${diary_id}`);

    if (result.length === 0) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: "diary not found",
      });
    }

    return result[0];
  }

  async create(body: CreateDiaryDto) {
    const { student_id } = body;
    return this.dbService.run(`INSERT INTO ${this.tableName} (student_id) VALUES (?)`, [student_id]);
  }

  async createAndReturnId(body: CreateDiaryDto) {
    const { student_id } = body;
    return this.dbService.query(`INSERT INTO ${this.tableName} (student_id) VALUES (?) RETURNING id`, [student_id]);
  }

  async delete(diary_id: number) {
    return this.dbService.run(`DELETE FROM ${this.tableName} WHERE id = ?`, [diary_id]);
  }
}
