import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { DatabaseService } from "DATABASE/database.service";
import { CreateLessonDto } from "./dto/create-lesson-dto";
import { TransformLessons } from "./utils/transformLessons";

@Injectable()
export class LessonService {
  private readonly tableName: string = "lessons";

  constructor(private readonly dbService: DatabaseService) {}

  async getAll() {
    const result = await this.dbService.query(
      `
			SELECT
				lessons.id AS lessons_id,
				lessons.subject,
				lessons.start_time,
				lessons.end_time,
				lessons.type,
				lessons.date,
				schedule.id AS schedule_id,
				schedule.day_of_week,
				classes.id AS class_id,
				classes.name AS class_name
			FROM
				${this.tableName}
			JOIN
				schedule ON lessons.schedule_id = schedule.id
			JOIN
				classes ON schedule.class_id = classes.id
			`,
    );

    return TransformLessons.transform(result);
  }

  async getLesson(lesson_id: number) {
    const result = await this.dbService.query(
      `
			SELECT
				lessons.id AS lessons_id,
				lessons.subject,
				lessons.start_time,
				lessons.end_time,
				lessons.type,
				lessons.date,
				schedule.id AS schedule_id,
				schedule.day_of_week,
				classes.id AS class_id,
				classes.name AS class_name
			FROM
				${this.tableName}
			JOIN
				schedule ON lessons.schedule_id = schedule.id
			JOIN
				classes ON schedule.class_id = classes.id
			WHERE
				lessons.id = ?
			`,
      [lesson_id],
    );

    if (result.length === 0) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: "Lesson not found",
      });
    }

    return TransformLessons.transform(result[0]);
  }

  async getLessonByDate(date: string) {
    const result = await this.dbService.query(
      `
			SELECT
				lessons.id AS lessons_id,
				lessons.subject,
				lessons.start_time,
				lessons.end_time,
				lessons.type,
				lessons.date,
				schedule.id AS schedule_id,
				schedule.day_of_week,
				classes.id AS class_id,
				classes.name AS class_name
			FROM
				${this.tableName}
			JOIN
				schedule ON lessons.schedule_id = schedule.id
			JOIN
				classes ON schedule.class_id = classes.id
			WHERE
				lessons.date = ?
			`,
      [date],
    );

    if (result.length === 0) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: "Lesson by date not found",
      });
    }

    return TransformLessons.transform(result);
  }

  async getLessonByClassAndDate(class_id: number, date: string) {
    const result = await this.dbService.query(
      `
			SELECT
				lessons.id AS lessons_id,
				lessons.subject,
				lessons.start_time,
				lessons.end_time,
				lessons.type,
				lessons.date,
				schedule.id AS schedule_id,
				schedule.day_of_week,
				classes.id AS class_id,
				classes.name AS class_name
			FROM
				${this.tableName}
			JOIN
				schedule ON lessons.schedule_id = schedule.id
			JOIN
				classes ON schedule.class_id = classes.id
			WHERE
				classes.id = ?
			AND
				lessons.date = ?
			`,
      [class_id, date],
    );

    if (result.length === 0) {
      throw new NotFoundException({
        code: HttpStatus.NOT_FOUND,
        message: "Lesson by class and date not found",
      });
    }

    return TransformLessons.transform(result);
  }

  async create(body: CreateLessonDto) {
    const { subject, start_time, end_time, type, date, schedule_id } = body;
    return this.dbService.run(`INSERT INTO ${this.tableName} (subject, start_time, end_time, type, date, schedule_id) VALUES (?, ?, ?, ?, ?, ?)`, [
      subject,
      start_time,
      end_time,
      type,
      date,
      schedule_id,
    ]);
  }

  async update(lesson_id: number, body: CreateLessonDto) {
    const { subject, start_time, end_time, type, date, schedule_id } = body;
    return this.dbService.run(`UPDATE ${this.tableName} SET subject = ?, start_time = ?, end_time = ?, type = ?, date = ?, schedule_id WHERE id = ?`, [
      subject,
      start_time,
      end_time,
      type,
      date,
      schedule_id,
      lesson_id,
    ]);
  }

  async delete(lesson_id: number) {
    return this.dbService.run(`DELETE FROM ${this.tableName} WHERE id = ?`, [lesson_id]);
  }
}
