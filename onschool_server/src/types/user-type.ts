import { ClassType } from './class-type';
import { RoleType } from './role-type';

type UserBaseType = {
	id: number;
	name: string;
	email: string;
	password: string;
	role: RoleType;
};

export type UserType = UserBaseType & {
	details: UserDetailsType;
};

export type InputUserType = InputDetailsType & {
	users_id: number;
	name: string;
	email: string;
	password: string;
	role_id: number;
	roles_name: string;
	roles_description: string;
};

export type InputDetailsType = {
	details_created_at?: string;
	details_last_login?: string;
	details_phone?: string;
	details_experience_years?: number;
	details_qualification?: string;
	details_employment_date?: string;
	details_salary?: number;
	details_balance?: number;
	details_address?: string;
	details_relationship?: string;
	details_emergency_contact?: string;
	details_class_id?: string;
	details_parent_id?: string;
};

export type UserDetailsType =
	| AdminDetailsType
	| TeacherDetailsType
	| ParentDetailsType
	| StudentDetailsType;

export type AdminDetailsType = {
	created_at: string;
	last_login: string;
	phone: string;
};

export type TeacherDetailsType = {
	subject_specialization: string;
	experience_years: number;
	qualification: string;
	employment_date: string;
	salary: number;
};

export type ParentDetailsType = {
	balance: number;
	address: string;
	relationship: string;
	emergency_contact: string;
};

export type StudentDetailsType = {
	class: ClassType;
	parent: UserType;
};
