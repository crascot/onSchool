import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class CreateUserBase {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;
}

export class CreateUserWithRole {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsString()
	@IsNotEmpty()
	email: string;

	@IsString()
	@IsNotEmpty()
	password: string;

	@IsInt()
	@IsNotEmpty()
	role_id: number;
}

class AdminDetails {
	@IsString()
	@IsNotEmpty()
	phone: string;

	@IsInt()
	@IsNotEmpty()
	school_id: number;
}

export class CreateAdminDto extends CreateUserBase {
	@ValidateNested()
	@Type(() => AdminDetails)
	details: AdminDetails;
}

export class AdminDetailsDto {
	@IsInt()
	@IsNotEmpty()
	user_id: number;

	@IsString()
	@IsNotEmpty()
	phone: string;

	@IsInt()
	@IsNotEmpty()
	school_id: number;
}

class TeacherDetails {
	@IsString()
	@IsNotEmpty()
	subject_specialization: string;

	@IsInt()
	@IsNotEmpty()
	experience_years: number;

	@IsString()
	@IsNotEmpty()
	qualification: string;

	@IsInt()
	@IsNotEmpty()
	salary: number;
}

export class CreateTeacherDto extends CreateUserBase {
	@ValidateNested()
	@Type(() => TeacherDetails)
	details: TeacherDetails;
}

export class TeacherDetailsDto {
	@IsInt()
	@IsNotEmpty()
	user_id: number;

	@IsString()
	@IsNotEmpty()
	subject_specialization: string;

	@IsInt()
	@IsNotEmpty()
	experience_years: number;

	@IsString()
	@IsNotEmpty()
	qualification: string;

	@IsInt()
	@IsNotEmpty()
	salary: number;
}

class ParentDetails {
	@IsInt()
	@IsNotEmpty()
	balance: number;

	@IsString()
	@IsNotEmpty()
	address: string;

	@IsString()
	@IsNotEmpty()
	relationship: string;

	@IsString()
	@IsNotEmpty()
	emergency_contact: string;
}

export class CreateParentDto extends CreateUserBase {
	@ValidateNested()
	@Type(() => ParentDetails)
	details: ParentDetails;
}

export class ParentDetailsDto {
	@IsInt()
	@IsNotEmpty()
	user_id: number;

	@IsInt()
	@IsNotEmpty()
	balance: number;

	@IsString()
	@IsNotEmpty()
	address: string;

	@IsString()
	@IsNotEmpty()
	relationship: string;

	@IsString()
	@IsNotEmpty()
	emergency_contact: string;
}

class StudentDetails {
	@IsInt()
	@IsNotEmpty()
	class_id: number;

	@IsInt()
	@IsNotEmpty()
	parent_id: number;
}

export class CreateStudentDto extends CreateUserBase {
	@ValidateNested()
	@Type(() => StudentDetails)
	details: StudentDetails;
}

export class StudentDetailsDto {
	@IsInt()
	@IsNotEmpty()
	user_id: number;

	@IsInt()
	@IsNotEmpty()
	class_id: number;

	@IsInt()
	@IsNotEmpty()
	parent_id: number;
}
