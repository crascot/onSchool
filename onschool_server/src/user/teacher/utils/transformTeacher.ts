import { RoleEnum } from 'types/role-type';
import { UserType } from 'types/user-type';

type InputTeacherType = {
	user_id: number;
	name: string;
	email: string;
	password: string;
	role_id: number;
	role_name: RoleEnum;
	role_description: string;
	teacher_details_subject_specialization: string;
	teacher_details_experience_years: number;
	teacher_details_qualification: string;
	teacher_details_employment_date: string;
	teacher_details_salary: number;
};

export class TransformTeacher {
	static transform(data: InputTeacherType): UserType;
	static transform(data: InputTeacherType[]): UserType[];
	static transform(
		data: InputTeacherType | InputTeacherType[]
	): UserType | UserType[] {
		if (Array.isArray(data)) {
			return data.map((value) => ({
				id: value.user_id,
				name: value.name,
				email: value.email,
				password: value.password,
				role: {
					id: value.role_id,
					name: value.role_name,
					description: value.role_description,
				},
				teacherDetails: {
					subject_specialization:
						value.teacher_details_subject_specialization,
					experience_years: value.teacher_details_experience_years,
					qualification: value.teacher_details_qualification,
					employment_date: value.teacher_details_employment_date,
					salary: value.teacher_details_salary,
				},
			}));
		} else {
			return {
				id: data.user_id,
				name: data.name,
				email: data.email,
				password: data.password,
				role: {
					id: data.role_id,
					name: data.role_name,
					description: data.role_description,
				},
				teacherDetails: {
					subject_specialization:
						data.teacher_details_subject_specialization,
					experience_years: data.teacher_details_experience_years,
					qualification: data.teacher_details_qualification,
					employment_date: data.teacher_details_employment_date,
					salary: data.teacher_details_salary,
				},
			};
		}
	}
}
