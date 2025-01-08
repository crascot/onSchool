import { ClassType } from './class-type';
import { DiaryType } from './diary-type';
import { RoleType } from './role-type';

type UserType = {
	id: number;
	name: string;
	email: string;
	password: string;
	role: RoleType;
	// role_id: number;
};

export interface AdminType extends UserType {
	user_id: number;
}

export interface TeacherType extends UserType {
	user_id: number;
}

export interface ParentType extends UserType {
	balance: number;
	user_id: number;
}

export interface Student extends UserType {
	user_id: number;
	class: ClassType;
	// class_id: number;
	parent: ParentType;
	// parent_id: number;
	diary: DiaryType;
	// diary_id: number;
}
