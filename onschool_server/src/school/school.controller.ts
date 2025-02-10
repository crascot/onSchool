import { Body, Controller, Get, Post } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school-dto';

@Controller('school')
export class SchoolController {
	constructor(private readonly schoolService: SchoolService) {}

	@Get()
	async getAll() {
		return this.schoolService.getAll();
	}

	@Post()
	async create(@Body() body: CreateSchoolDto) {
		return this.schoolService.create(body);
	}
}
