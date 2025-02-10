import { Grade } from 'types/grade-type';

export class CreateGradeDto {
	grade: Grade;
	message?: string;
	diary_id: string;
	lesson_id: string;
}
