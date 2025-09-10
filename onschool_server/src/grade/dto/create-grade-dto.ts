import { IsIn, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Grade } from "types/grade-type";

export class CreateGradeDto {
  private static readonly allowedGrades = Object.values<Grade>([1, 2, 3, 4, 5]);

  @IsIn(CreateGradeDto.allowedGrades, {
    message: `Grade must be one of: ${CreateGradeDto.allowedGrades.join(", ")}`,
  })
  @IsNotEmpty()
  grade: Grade;

  @IsString()
  @IsNotEmpty()
  message?: string;

  @IsInt()
  @IsNotEmpty()
  diary_id: number;

  @IsInt()
  @IsNotEmpty()
  lesson_id: number;
}
