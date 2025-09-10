import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  task: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsString()
  @IsNotEmpty()
  end_at: string;

  @IsInt()
  @IsNotEmpty()
  class_id: number;

  @IsInt()
  @IsNotEmpty()
  lesson_id: number;

  @IsInt()
  @IsOptional()
  student_id: number | null;
}
