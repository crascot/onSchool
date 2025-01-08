import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ClassService } from './class.service';

@Controller('class')
export class ClassController {
	constructor(private readonly classService: ClassService) {}

	@Get()
	async getAll() {
		return this.classService.getAll();
	}

	@Get(':class_id')
	async getClass(@Param('class_id') class_id: string) {
		return this.classService.getClass(class_id);
	}

	@Post()
	async create(@Body() body: { name: string }) {
		return this.classService.create(body);
	}

	@Put(':class_id')
	async update(
		@Param('class_id') class_id: string,
		@Body() body: { name: string }
	) {
		return this.classService.update(class_id, body);
	}

	@Delete(':class_id')
	async delete(@Param('class_id') class_id: string) {
		this.classService.delete(class_id);
	}
}
