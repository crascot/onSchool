import {
	AdminDetailsType,
	InputDetailsType,
	InputUserType,
	ParentDetailsType,
	StudentDetailsType,
	TeacherDetailsType,
	UserDetailsType,
	UserType,
} from 'types/user-type';

export class TransformUsers {
	static transform(data: InputUserType): UserType;
	static transform(data: InputUserType[]): UserType[];
	static transform(data: InputUserType | InputUserType[]) {
		const transformDetails = (input: InputDetailsType): UserDetailsType => {
			const detailsEntries = Object.entries(input)
				.filter(([key]) => key.startsWith('details_'))
				.map(([key, value]) => [key.replace('details_', ''), value]);

			const details = Object.fromEntries(
				detailsEntries.filter(
					([_, value]) => value !== undefined && value !== null
				)
			);

			if ('phone' in details && 'last_login' in details) {
				return details as AdminDetailsType;
			}
			if ('experience_years' in details && 'qualification' in details) {
				return details as TeacherDetailsType;
			}
			if ('balance' in details && 'relationship' in details) {
				return details as ParentDetailsType;
			}
			if ('class_id' in details && 'parent_id' in details) {
				return details as StudentDetailsType;
			}
			return {} as UserDetailsType;
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
