import { IsInt, IsNotEmpty } from "class-validator";

export class CreateDiaryDto {
  @IsInt()
  @IsNotEmpty()
  student_id: number;
}
