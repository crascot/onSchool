import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateClassDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  school_id: number;
}
