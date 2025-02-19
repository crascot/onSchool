import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade-dto';
import { DiaryService } from 'diary/diary.service';
import { LessonService } from 'lesson/lesson.service';

@Controller('grade')
export class GradeController {
	constructor(
		private readonly gradeService: GradeService,
		private readonly diaryService: DiaryService,
		private readonly lessonService: LessonService
	) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll() {
		return this.gradeService.getAll();
	}

	@HttpCode(HttpStatus.OK)
	@Get(':grade_id')
	async getGrade(@Param('grade_id') grade_id: string) {
		return this.gradeService.getGrade(Number(grade_id));
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(@Body() body: CreateGradeDto) {
		await this.validate(body);

		await this.gradeService.create(body);

		return { code: HttpStatus.CREATED, message: 'Grade created' };
	}

	@HttpCode(HttpStatus.OK)
	@Put(':grade_id')
	async update(@Param('grade_id') grade_id: string, body: CreateGradeDto) {
		await this.validate(body, Number(grade_id));

		await this.gradeService.update(Number(grade_id), body);

		return { code: HttpStatus.OK, message: 'Grade updated' };
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':grade_id')
	async delete(@Param('grade_id') grade_id: string) {
		await this.gradeService.getGrade(Number(grade_id));

		await this.gradeService.delete(Number(grade_id));

		return { code: HttpStatus.NO_CONTENT, message: 'Grade deleted' };
	}

	private async validate(body: CreateGradeDto, grade_id?: number) {
		const { diary_id, lesson_id } = body;

		if (grade_id) {
			await this.gradeService.getGrade(grade_id);
		}

		await this.diaryService.getDiary(diary_id);

		await this.lessonService.getLesson(lesson_id);
	}
}
