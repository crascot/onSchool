export class CreateUserDto {
	name: string;
	email: string;
	password: string;
	role_id: number;
	details: {
		user_id: string;
		phone?: string;

		subject_specialization?: string;
		experience_years?: number;
		qualification?: string;
		employment_date?: string;
		salary?: number;

		balance?: number;
		address?: string;
		relationship?: string;
		emergency_contact?: string;

		class_id?: string;
		parent_id?: string;
	};
}
