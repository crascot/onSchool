import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post } from "@nestjs/common";
import { DiaryService } from "./diary.service";
import { CreateDiaryDto } from "./dto/create-diary-dto";
import { StudentService } from "USER/student/student.service";

@Controller("diary")
export class DiaryController {
  constructor(
    private readonly diaryService: DiaryService,
    private readonly studentService: StudentService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll() {
    return this.diaryService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(":diary_id")
  async getDiary(@Param("diary_id") diary_id: string) {
    return this.diaryService.getDiary(Number(diary_id));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() body: CreateDiaryDto) {
    await this.validate(body);

    await this.diaryService.create(body);

    return { code: HttpStatus.CREATED, message: "Diary created" };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":diary_id")
  async delete(@Param("diary_id") diary_id: string) {
    await this.diaryService.getDiary(Number(diary_id));

    await this.diaryService.delete(Number(diary_id));

    return { code: HttpStatus.NO_CONTENT, message: "Diary deleted" };
  }

  private async validate(body: CreateDiaryDto) {
    const { student_id } = body;

    await this.studentService.getOne(Number(student_id));
  }
}
