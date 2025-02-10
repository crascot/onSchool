import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import {
	CreateAdminDto,
	CreateParentDto,
	CreateStudentDto,
	CreateTeacherDto,
	CreateUserBase,
} from './dto/create-user-dto';
import { AdminService } from './admin/admin.service';
import { TeacherService } from './teacher/teacher.service';
import { ParentService } from './parent/parent.service';
import { StudentService } from './student/student.service';

@Injectable()
export class UserService {
	constructor(
		private readonly dbService: DatabaseService,
		private readonly adminService: AdminService,
		private readonly teacherService: TeacherService,
		private readonly parentService: ParentService,
		private readonly studentService: StudentService
	) {}

	async findByName(username: string) {
		const result = await this.dbService.query(
			'SELECT * FROM users WHERE users.name = ?',
			[username]
		);

		return result[0];
	}

	async createUserAndReturnId(body: CreateUserBase): Promise<number> {
		const { name, email, password, role_id } = body;

		const userResult = await this.dbService.query(
			`INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?) RETURNING id`,
			[name, email, password, role_id]
		);

		if (!userResult) {
			throw new NotFoundException({ message: 'User not found' });
		}

		return userResult[0].id;
	}

	async createAdmin(body: CreateAdminDto) {
		const { name, email, password, role_id, details } = body;
		const db = this.dbService;

		try {
			await db.run('BEGIN TRANSACTION');

			const userId = await this.createUserAndReturnId({
				name,
				email,
				password,
				role_id,
			});

			if (!userId) {
				throw new NotFoundException({ message: 'User not found' });
			}

			const adminId = await this.adminService.create({
				user_id: userId,
				...details,
			});

			if (!adminId) {
				throw new BadRequestException('Admin creation failed');
			}

			await db.run('COMMIT');

			return { message: 'Admin user created' };
		} catch (error: any) {
			await db.run('ROLLBACK');
			console.log('ROLLBACK: ', error);
		}
	}

	async createTeacher(body: CreateTeacherDto) {
		const { name, email, password, role_id, details } = body;
		const db = this.dbService;

		try {
			await db.run('BEGIN TRANSACTION');

			const userId = await this.createUserAndReturnId({
				name,
				email,
				password,
				role_id,
			});

			if (!userId) {
				throw new NotFoundException({ message: 'User not found' });
			}

			const teacherId = await this.teacherService.create({
				user_id: userId,
				...details,
			});

			if (!teacherId) {
				throw new BadRequestException('Teacher creation failed');
			}

			await db.run('COMMIT');

			return { message: 'Teacher user created' };
		} catch (error: any) {
			await db.run('ROLLBACK');
			console.log('ROLLBACK: ', error);
		}
	}

	async createParent(body: CreateParentDto) {
		const { name, email, password, role_id, details } = body;
		const db = this.dbService;

		try {
			await db.run('BEGIN TRANSACTION');

			const userId = await this.createUserAndReturnId({
				name,
				email,
				password,
				role_id,
			});

			if (!userId) {
				throw new NotFoundException({ message: 'User not found' });
			}

			const parentId = await this.parentService.create({
				user_id: userId,
				...details,
			});

			if (!parentId) {
				throw new BadRequestException('Teacher creation failed');
			}

			await db.run('COMMIT');

			return { message: 'Parent user created' };
		} catch (error: any) {
			await db.run('ROLLBACK');
			console.log('ROLLBACK: ', error);
		}
	}

	async createStudent(body: CreateStudentDto) {
		const { name, email, password, role_id, details } = body;
		const db = this.dbService;

		try {
			await db.run('BEGIN TRANSACTION');

			const userId = await this.createUserAndReturnId({
				name,
				email,
				password,
				role_id,
			});

			if (!userId) {
				throw new NotFoundException({ message: 'User not found' });
			}

			const studentId = await this.studentService.create({
				user_id: userId,
				...details,
			});

			if (!studentId) {
				throw new BadRequestException('Teacher creation failed');
			}

			await db.run('COMMIT');

			return { message: 'Student user created' };
		} catch (error: any) {
			await db.run('ROLLBACK');
			console.log('ROLLBACK: ', error);
		}
	}

	async updateUser(user_id: number, body: CreateUserBase) {
		const { name, email, password, role_id } = body;

		await this.dbService.run(
			'UPDATE users SET name = ?, email = ?, password = ?, role_id = ? WHERE id = ?',
			[name, email, password, role_id, user_id]
		);

		return { message: 'User updated' };
	}

	async deleteUser(user_id: number) {
		await this.dbService.run('DELETE FROM users WHERE id = ?', [user_id]);
		return { message: 'User deleted' };
	}
}
