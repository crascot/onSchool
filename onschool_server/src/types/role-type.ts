export enum RoleEnum {
	ADMIN = 'ADMIN',
	TEACHER = 'TEACHER',
	PARENT = 'PARENT',
	STUDENT = 'STUDENT',
}

export type RoleType = {
	id: number;
	name: string;
	description: string;
};
