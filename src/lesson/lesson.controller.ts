import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { LessonService } from "./lesson.service";
import { CreateLessonDto } from "./dto/create-lesson-dto";
import { ClassService } from "CLASS/class.service";
import { ScheduleService } from "SCHEDULE/schedule.service";

// eslint-disable-next-line no-console
console.log("asdsda");

@Controller("lesson")
export class LessonController {
  constructor(
    private readonly lessonService: LessonService,
    private readonly classService: ClassService,
    private readonly sheduleService: ScheduleService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll() {
    return this.lessonService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(":lesson_id")
  async getLesson(@Param("lesson_id") lesson_id: string) {
    return this.lessonService.getLesson(Number(lesson_id));
  }

  @HttpCode(HttpStatus.OK)
  @Get("date/:date")
  async getLessonByDate(@Param("date") date: string) {
    return this.lessonService.getLessonByDate(date);
  }

  @HttpCode(HttpStatus.OK)
  @Get("class/:class_id/date/:date")
  async getLessonByClassAndDate(@Param("class_id") class_id: string, @Param("date") date: string) {
    await this.classService.getClass(Number(class_id));

    return this.lessonService.getLessonByClassAndDate(Number(class_id), date);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() body: CreateLessonDto) {
    await this.validate(body);

    await this.lessonService.create(body);

    return { code: HttpStatus.CREATED, message: "Lesson created" };
  }

  @HttpCode(HttpStatus.OK)
  @Put(":lesson_id")
  async update(@Param("lesson_id") lesson_id: string, @Body() body: CreateLessonDto) {
    await this.validate(body, Number(lesson_id));

    await this.lessonService.update(Number(lesson_id), body);

    return { code: HttpStatus.OK, message: "Lesson updated" };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":lesson_id")
  async delete(@Param("lesson_id") lesson_id: string) {
    await this.lessonService.getLesson(Number(lesson_id));

    await this.lessonService.delete(Number(lesson_id));

    return { code: HttpStatus.NO_CONTENT, message: "Lesson deleted" };
  }

  private async validate(body: CreateLessonDto, lesson_id?: number) {
    const { schedule_id } = body;

    if (lesson_id) {
      await this.lessonService.getLesson(lesson_id);
    }

    await this.sheduleService.getSchedule(schedule_id);
  }
}
