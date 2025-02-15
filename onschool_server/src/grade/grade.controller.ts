import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto } from './dto/create-grade-dto';

@Controller('grade')
export class GradeController {
	constructor(private readonly gradeService: GradeService) {}

	@Get()
	async getAll() {
		return this.gradeService.getAll();
	}

	@Get(':grade_id')
	async getGrade(@Param('grade_id') grade_id: string) {
		return this.gradeService.getGrade(Number(grade_id));
	}

	@Post()
	async create(@Body() body: CreateGradeDto) {
		return this.gradeService.create(body);
	}

	@Put(':grade_id')
	async update(@Param('grade_id') grade_id: string, body: CreateGradeDto) {
		return this.gradeService.update(grade_id, body);
	}

	@Delete(':grade_id')
	async delete(@Param('grade_id') grade_id: string) {
		return this.gradeService.delete(grade_id);
	}
}
