import { ScheduleType } from 'types/schedule-type';

type InputScheduleType = {
	schedule_id: number;
	day_of_week: string;
	class_id: number;
	class_name: string;
};

export class TransformSchedule {
	static transform(data: InputScheduleType): ScheduleType;
	static transform(data: InputScheduleType[]): ScheduleType[];
	static transform(
		data: InputScheduleType | InputScheduleType[]
	): ScheduleType | ScheduleType[] {
		if (Array.isArray(data)) {
			return data.map((e) => ({
				id: e.schedule_id,
				day_of_week: e.day_of_week,
				class: {
					id: e.class_id,
					name: e.class_name,
				},
			}));
		} else {
			return {
				id: data.schedule_id,
				day_of_week: data.day_of_week,
				class: {
					id: data.class_id,
					name: data.class_name,
				},
			};
		}
	}
}
