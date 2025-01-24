import { ClassType } from 'types/class-type';
import { DiaryType } from 'types/diary-type';
import { RoleEnum } from 'types/role-type';
import { UserDetailsType, UserType } from 'types/user-type';

type InputUserType = {
	users_id: number;
	name: string;
	email: string;
	password: string;
	role_id: number;
	roles_name: RoleEnum;
	roles_description: string;
	user_id: string;
	details_created_at?: string;
	details_last_login?: string;
	details_phone?: string;

	details_subject_specialization?: string;
	details_experience_years?: number;
	details_qualification?: string;
	details_employment_date?: string;
	details_salary?: number;

	details_balance?: number;
	details_address?: string;
	details_relationship?: string;
	details_emergency_contact?: string;

	details_class?: ClassType;
	details_parent?: UserType;
	details_diary?: DiaryType;
};

export class TransformUsers {
	static transform(data: InputUserType): UserType;
	static transform(data: InputUserType[]): UserType[];
	static transform(
		data: InputUserType | InputUserType[]
	): UserType | UserType[] {
		const transformDetails = (input: InputUserType): UserDetailsType => {
			const details: UserDetailsType = {};

			if (input.details_created_at)
				details.created_at = input.details_created_at;
			if (input.details_last_login)
				details.last_login = input.details_last_login;
			if (input.details_phone) details.phone = input.details_phone;
			if (input.details_subject_specialization)
				details.subject_specialization =
					input.details_subject_specialization;
			if (input.details_experience_years)
				details.experience_years = input.details_experience_years;
			if (input.details_qualification)
				details.qualification = input.details_qualification;
			if (input.details_employment_date)
				details.employment_date = input.details_employment_date;
			if (input.details_salary)
				if (
					input.details_balance !== null &&
					input.details_balance !== undefined
				)
					details.balance = input.details_balance;
			if (input.details_address) details.address = input.details_address;
			if (input.details_relationship)
				details.relationship = input.details_relationship;
			if (input.details_emergency_contact)
				details.emergency_contact = input.details_emergency_contact;
			if (input.details_class) details.class = input.details_class;
			if (input.details_parent) details.parent = input.details_parent;
			if (input.details_diary) details.diary = input.details_diary;

			return details;
		};

		const transformUser = (input: InputUserType): UserType => ({
			id: input.users_id,
			name: input.name,
			email: input.email,
			password: input.password,
			role: {
				id: input.role_id,
				name: input.roles_name,
				description: input.roles_description,
			},
			details: transformDetails(input),
		});

		if (Array.isArray(data)) {
			return data.map(transformUser);
		} else {
			return transformUser(data);
		}
	}
}
