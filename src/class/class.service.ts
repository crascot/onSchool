import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "DATABASE/database.service";
import { ClassType } from "types/class-type";
import { CreateClassDto } from "./dto/create-class-dto";

@Injectable()
export class ClassService {
  private readonly tableName: string = "classes";

  constructor(private readonly dbService: DatabaseService) {}

  async getAll() {
    return this.dbService.query(`SELECT * FROM ${this.tableName}`);
  }

  async getClass(class_id: number) {
    const result: ClassType[] = await this.dbService.query(`SELECT * FROM ${this.tableName} WHERE id = ${class_id}`);

    if (result.length === 0) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: "Class not found",
      });
    }

    return result[0];
  }

  async create(body: CreateClassDto) {
    const { name, school_id } = body;

    return this.dbService.run(`INSERT INTO ${this.tableName} (name, school_id) VALUES (?, ?)`, [name, school_id]);
  }

  async update(class_id: string, body: CreateClassDto) {
    const { name, school_id } = body;
    return this.dbService.run(`UPDATE ${this.tableName} SET name = ?, school_id = ? WHERE id = ?`, [name, school_id, class_id]);
  }

  async delete(class_id: string) {
    return this.dbService.run(`DELETE FROM ${this.tableName} WHERE id = ?`, [class_id]);
  }
}
