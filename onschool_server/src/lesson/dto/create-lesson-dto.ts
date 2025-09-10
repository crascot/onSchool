import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateLessonDto {
  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  start_time: string;

  @IsString()
  @IsNotEmpty()
  end_time: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsInt()
  @IsNotEmpty()
  schedule_id: number;
}
