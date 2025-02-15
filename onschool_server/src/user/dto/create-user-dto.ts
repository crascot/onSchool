export class CreateUserBase {
	name: string;
	email: string;
	password: string;
}

export class CreateUserWithRole {
	name: string;
	email: string;
	password: string;
	role_id: number;
}

export class CreateAdminDto extends CreateUserBase {
	details: {
		phone: string;
		school_id: number;
	};
}

export class AdminDetailsDto {
	user_id: number;
	phone: string;
	school_id: number;
}

export class CreateTeacherDto extends CreateUserBase {
	details: {
		subject_specialization: string;
		experience_years: number;
		qualification: string;
		salary: number;
	};
}

export class TeacherDetailsDto {
	user_id: number;
	subject_specialization: string;
	experience_years: number;
	qualification: string;
	salary: number;
}

export class CreateParentDto extends CreateUserBase {
	details: {
		balance: number;
		address: string;
		relationship: string;
		emergency_contact: string;
	};
}

export class ParentDetailsDto {
	user_id: number;
	balance: number;
	address: string;
	relationship: string;
	emergency_contact: string;
}

export class CreateStudentDto extends CreateUserBase {
	details: {
		class_id: number;
		parent_id: number;
	};
}

export class StudentDetailsDto {
	user_id: number;
	class_id: number;
	parent_id: number;
}
