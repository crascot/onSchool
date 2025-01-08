import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary-dto';

@Controller('diary')
export class DiaryController {
	constructor(private readonly diaryService: DiaryService) {}

	@Get()
	async getAll() {
		return this.diaryService.getAll();
	}

	@Get(':diary_id')
	async getDiary(@Param('diary_id') diary_id: string) {
		return this.diaryService.getDiary(diary_id);
	}

	@Post()
	async create(@Body() body: CreateDiaryDto) {
		return this.diaryService.create(body);
	}

	@Put(':diary_id')
	async update(@Param('diary_id') diary_id: string, body: CreateDiaryDto) {
		return this.diaryService.update(diary_id, body);
	}

	@Delete(':diary_id')
	async delete(@Param('diary_id') diary_id: string) {
		return this.diaryService.delete(diary_id);
	}
}
