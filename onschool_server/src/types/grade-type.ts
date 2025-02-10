import { DiaryType } from './diary-type';
import { LessonType } from './lesson-type';

export type Grade = 1 | 2 | 3 | 4 | 5;

export type GradeType = {
	id: number;
	grade: Grade;
	message?: string;
	diary: DiaryType;
	// diary_id: number;
	lesson: LessonType;
	// lesson_id: number;
};
