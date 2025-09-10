import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { CreateTaskDto } from "./dto/create-task-dto";
import { ClassService } from "CLASS/class.service";
import { LessonService } from "lesson/lesson.service";
import { StudentService } from "USER/student/student.service";

@Controller("task")
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly classService: ClassService,
    private readonly lessonService: LessonService,
    private readonly studentService: StudentService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll() {
    return this.taskService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(":task_id")
  async getTask(@Param("task_id") task_id: string) {
    const result = await this.taskService.getOne(Number(task_id));

    return result;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() body: CreateTaskDto) {
    await this.validate(body);

    await this.taskService.create(body);

    return { code: HttpStatus.CREATED, message: "Task created" };
  }

  @HttpCode(HttpStatus.OK)
  @Put(":task_id")
  async update(@Param("task_id") task_id: string, @Body() body: CreateTaskDto) {
    await this.validate(body, Number(task_id));

    await this.taskService.update(Number(task_id), body);

    return { code: HttpStatus.OK, message: "Task updated" };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":task_id")
  async delete(@Param("task_id") task_id: string) {
    await this.taskService.getOne(Number(task_id));

    await this.taskService.delete(Number(task_id));

    return { code: HttpStatus.NO_CONTENT, message: "Task deleted" };
  }

  private async validate(body: CreateTaskDto, task_id?: number) {
    const { class_id, lesson_id, student_id } = body;

    if (task_id) {
      await this.taskService.getOne(task_id);
    }

    await this.classService.getClass(Number(class_id));

    await this.lessonService.getLesson(Number(lesson_id));

    if (student_id) {
      await this.studentService.getOne(Number(student_id));
    }
  }
}
