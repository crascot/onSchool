import { ScheduleType } from './schedule-type';

export type LessonType = {
	id: number;
	subject: string;
	start_time: string;
	end_time: string;
	type: string;
	date: string;
	schedule: ScheduleType;
};
