import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule-dto';

@Controller('schedule')
export class ScheduleController {
	constructor(private readonly scheduleService: ScheduleService) {}

	@Get()
	async getAll() {
		return this.scheduleService.getAll();
	}

	@Get(':schedule_id')
	async getSchedule(@Param('schedule_id') schedule_id: string) {
		return this.scheduleService.getSchedule(schedule_id);
	}
	@Post()
	async create(@Body() body: CreateScheduleDto) {
		return this.scheduleService.create(body);
	}
	@Put(':schedule_id')
	async update(
		@Param('schedule_id') schedule_id: string,
		body: CreateScheduleDto
	) {
		return this.scheduleService.update(schedule_id, body);
	}
	@Delete(':schedule_id')
	async delete(@Param('schedule_id') schedule_id: string) {
		return this.scheduleService.delete(schedule_id);
	}
}
