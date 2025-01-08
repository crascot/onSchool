import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson-dto';

@Controller('lesson')
export class LessonController {
	constructor(private readonly lessonService: LessonService) {}

	@Get()
	async getAll() {
		return this.lessonService.getAll();
	}

	@Get(':lesson_id')
	async getLesson(@Param('lesson_id') lesson_id: string) {
		return this.lessonService.getLesson(lesson_id);
	}

	@Post()
	async create(@Body() body: CreateLessonDto) {
		return this.lessonService.create(body);
	}

	@Put(':lesson_id')
	async update(
		@Param('lesson_id') lesson_id: string,
		@Body() body: CreateLessonDto
	) {
		return this.lessonService.update(lesson_id, body);
	}

	@Delete(':lesson_id')
	async delete(@Param('lesson_id') lesson_id: string) {
		return this.lessonService.delete(lesson_id);
	}
}
