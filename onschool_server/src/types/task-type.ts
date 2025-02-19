import { ClassType } from './class-type';
import { LessonType } from './lesson-type';
import { StudentDetailsType } from './user-type';

export type TaskType = {
	id: number;
	task: string;
	type: string;
	status: string;
	created_at: string;
	updated_at: string;
	end_at: string;
	class: ClassType;
	lesson: LessonType;
	student: StudentDetailsType | null;
};
