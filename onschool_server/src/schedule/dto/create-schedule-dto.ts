import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateScheduleDto {
	@IsInt()
	@IsNotEmpty()
	class_id: number;

	@IsString()
	@IsNotEmpty()
	day_of_week: string;
}
