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
import { ScheduleService } from './schedule.service';
import { CreateScheduleDto } from './dto/create-schedule-dto';
import { ClassService } from 'CLASS/class.service';

@Controller('schedule')
export class ScheduleController {
	constructor(
		private readonly scheduleService: ScheduleService,
		private readonly classService: ClassService
	) {}

	@HttpCode(HttpStatus.OK)
	@Get()
	async getAll() {
		return this.scheduleService.getAll();
	}

	@HttpCode(HttpStatus.OK)
	@Get(':schedule_id')
	async getSchedule(@Param('schedule_id') schedule_id: string) {
		return this.scheduleService.getSchedule(Number(schedule_id));
	}

	@HttpCode(HttpStatus.OK)
	@Get('/class/:class_id')
	async getScheduleByClassId(@Param('class_id') class_id: string) {
		return this.scheduleService.getScheduleByClassId(Number(class_id));
	}

	@HttpCode(HttpStatus.CREATED)
	@Post()
	async create(@Body() body: CreateScheduleDto) {
		await this.validate(body);

		await this.scheduleService.create(body);

		return { code: HttpStatus.CREATED, message: 'Schedule created' };
	}

	@HttpCode(HttpStatus.OK)
	@Put(':schedule_id')
	async update(
		@Param('schedule_id') schedule_id: string,
		@Body() body: CreateScheduleDto
	) {
		await this.validate(body, Number(schedule_id));

		await this.scheduleService.update(Number(schedule_id), body);

		return { code: HttpStatus.OK, message: 'Schedule updated' };
	}

	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete(':schedule_id')
	async delete(@Param('schedule_id') schedule_id: string) {
		await this.scheduleService.getSchedule(Number(schedule_id));

		await this.scheduleService.delete(Number(schedule_id));

		return { code: HttpStatus.NO_CONTENT, message: 'Schedule deleted' };
	}

	private async validate(body: CreateScheduleDto, schedule_id?: number) {
		const { class_id } = body;

		if (schedule_id) {
			await this.scheduleService.getSchedule(schedule_id);
		}

		await this.classService.getClass(class_id);
	}
}
