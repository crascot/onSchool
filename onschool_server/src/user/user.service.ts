import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { DatabaseService } from 'DATABASE/database.service';
import { AdminService } from './admin/admin.service';
import { TransformUsers } from './utils/transformUsers';
import { ParentService } from './parent/parent.service';
import { TeacherService } from './teacher/teacher.service';
import { DiaryService } from 'diary/diary.service';
import { StudentService } from './student/student.service';
import { ClassService } from 'CLASS/class.service';

@Injectable()
export class UserService {
	constructor(
		private readonly dbService: DatabaseService,
		private readonly adminService: AdminService,
		private readonly teacherService: TeacherService,
		private readonly parentService: ParentService,
		private readonly studentService: StudentService,
		private readonly diaryService: DiaryService,
		private readonly classService: ClassService
	) {}

	async getAll() {
		const users = await this.dbService.query(
			`
			SELECT
				users.id AS users_id,
				users.name,
				users.email,
				users.password,
				users.role_id,
				roles.name AS roles_name,
				roles.description AS roles_description,
				admin_details.created_at AS details_created_at,
				admin_details.last_login AS details_last_login,
				admin_details.phone AS details_phone,
				teacher_details.experience_years AS details_experience_years,
				teacher_details.qualification AS details_qualification,
				teacher_details.employment_date AS details_employment_date,
				teacher_details.salary AS details_salary,
				parent_details.balance AS details_balance,
				parent_details.address AS details_address,
				parent_details.relationship AS details_relationship,
				parent_details.emergency_contact AS details_emergency_contact,
				student_details.class_id AS details_class_id,
				student_details.parent_id AS details_parent_id,
				student_details.diary_id AS details_diary_id
			FROM users
    		JOIN roles ON users.role_id = roles.id
    		LEFT JOIN admin_details ON users.id = admin_details.user_id
			LEFT JOIN teacher_details ON users.id = teacher_details.user_id
    		LEFT JOIN parent_details ON users.id = parent_details.user_id
    		LEFT JOIN student_details ON users.id = student_details.user_id`
		);

		return TransformUsers.transform(users);
	}

	async getOne(user_id: string) {
		const userQuery = `
		SELECT
			users.id AS users_id,
			users.name,
			users.email,
			users.password,
			users.role_id,
			roles.name AS roles_name,
			roles.description AS roles_description
		FROM users
		JOIN roles ON users.role_id = roles.id
		WHERE users.id = ?
		`;

		const user = await this.dbService.query(userQuery, [user_id]);

		if (user.length === 0) {
			throw new Error('User not found');
		}

		const userDetails = await this.getUserDetailsByRole(
			user_id,
			user[0].role_id
		);

		return TransformUsers.transform({
			...user[0],
			...userDetails,
		});
	}

	async getUserDetailsByRole(user_id: string, role_id: number) {
		switch (role_id) {
			case 1:
				const adminDetails = await this.dbService.query(
					`SELECT
						phone AS details_phone,
						created_at AS details_created_at,
						last_login AS details_last_login 
					FROM
						admin_details
					WHERE
						user_id = ?`,
					[user_id]
				);
				return adminDetails[0];
			case 3:
				const parentDetails = await this.dbService.query(
					`SELECT balance AS details_balance
					FROM parent_details
					WHERE user_id = ?`,
					[user_id]
				);
				return parentDetails[0];
			default:
				return {};
		}
	}

	async create(body: CreateUserDto) {
		const { name, email, password, role_id, details } = body;
		const db = this.dbService;

		await db.run('BEGIN TRANSACTION');
		try {
			const userResult = await db.query(
				`INSERT INTO users (name, email, password, role_id)
				VALUES (?, ?, ?, ?) RETURNING id`,
				[name, email, password, role_id]
			);
			const userId = userResult[0].id;

			switch (role_id) {
				case 1:
					if (!details || !details.phone) {
						throw new Error(
							'Missing required admin details (phone)'
						);
					}
					await this.adminService.create(userId, details.phone);
					break;
				case 2:
					if (
						!details ||
						!details.subject_specialization ||
						!details.experience_years ||
						!details.qualification ||
						!details.salary
					) {
						throw new Error(
							'Missing required teacher details (subject_specialization, experience_years, qualification, salary)'
						);
					}
					await this.teacherService.create(
						userId,
						details.subject_specialization,
						details.experience_years,
						details.qualification,
						details.salary
					);
					break;
				case 3:
					if (
						!details ||
						!details.address ||
						!details.relationship ||
						!details.emergency_contact
					) {
						throw new Error(
							'Missing required parent details (address, relationship, emergency_contact)'
						);
					}

					await this.parentService.create(
						userId,
						details.address,
						details.relationship,
						details.emergency_contact,
						details.balance
					);
					break;
				case 4:
					if (!details || !details.class_id || !details.parent_id) {
						throw new Error(
							'Missing required parent details (class_id, parent_id)'
						);
					}

					const diaryResult =
						await this.diaryService.createAndReturnId({
							student_id: userId,
						});

					const diaryId = diaryResult[0].id;

					const parentResult = await this.getOne(details.parent_id);
					const classResult = await this.classService.getClass(
						details.class_id
					);

					if (!diaryId) {
						throw new Error('Diary not created');
					}

					if (!classResult.id) {
						throw new Error('Class not found');
					}

					if (!parentResult.id) {
						throw new Error('Parent not found');
					}

					await this.studentService.create(
						userId,
						details.class_id,
						parentResult.id,
						diaryId
					);
					break;
				default:
					throw new Error('Invalid role_id');
			}

			await db.run('COMMIT');
		} catch (err) {
			await db.run('ROLLBACK');
			console.log('ROLLBACK, ', err);

			throw err;
		}
	}

	async update(user_id: string, body: UpdateUserDto) {
		const { name, email, password } = body;
		return this.dbService.run(
			'UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?',
			[name, email, password, user_id]
		);
	}

	async changeRole(user_id: string, role_id: string) {
		return this.dbService.run('UPDATE users SET role_id = ? WHERE id = ?', [
			role_id,
			user_id,
		]);
	}

	async delete(user_id: string) {
		return this.dbService.run('DELETE FROM users WHERE id = ?', [user_id]);
	}
}
