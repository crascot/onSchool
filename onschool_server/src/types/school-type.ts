import { UserType } from './user-type';

export type SchoolType = {
	id: number;
	name: string;
	status: string;
	address: string;
	created_at: string;
	updated_at: string;
	principal: UserType;
};
