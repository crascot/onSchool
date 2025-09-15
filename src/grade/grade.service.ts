import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGradeDto } from "./dto/create-grade-dto";
import { DatabaseService } from "DATABASE/database.service";

@Injectable()
export class GradeService {
  private readonly tableName: string = "grades";

  constructor(private readonly dbService: DatabaseService) {}

  async getAll() {
    const result = await this.dbService.query(`SELECT * FROM ${this.tableName}`);

    return result;
  }

  async getGrade(grade_id: number) {
    const result = await this.dbService.query(`SELECT * FROM ${this.tableName} WHERE id  = ?`, [grade_id]);

    if (result.length === 0) {
      throw new NotFoundException({ message: "Grade not found" });
    }

    return result[0];
  }

  async create(body: CreateGradeDto) {
    const { grade, message, diary_id, lesson_id } = body;

    return this.dbService.run(`INSERT INTO ${this.tableName} (grade, message, diary_id, lesson_id) VALUES (?, ?, ?, ?)`, [grade, message ?? null, diary_id, lesson_id]);
  }

  async update(grade_id: number, body: CreateGradeDto) {
    const { grade, message, diary_id, lesson_id } = body;

    return this.dbService.run(`UPDATE ${this.tableName} SET grade = ?, message = ?, diary_id = ?, lesson_id = ? WHERE id = ?`, [
      grade,
      message ?? null,
      diary_id,
      lesson_id,
      grade_id,
    ]);
  }

  async delete(grade_id: number) {
    return this.dbService.run(`DELETE FROM ${this.tableName} WHERE id = ?`, [grade_id]);
  }
}
