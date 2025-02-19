import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSchoolDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	status: string;

	@IsString()
	@IsNotEmpty()
	address: string;
}
