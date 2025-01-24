import { ClassType } from './class-type';
import { DiaryType } from './diary-type';
import { RoleType } from './role-type';

export type UserType = {
	id: number;
	name: string;
	email: string;
	password: string;
	role: RoleType;
	details?: UserDetailsType;
};

export type UserDetailsType = {
	created_at?: string;
	last_login?: string;
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

	class?: ClassType;
	parent?: UserType;
	diary?: DiaryType;
};
