import * as bcrypt from 'bcrypt';
import {
	BadRequestException,
	HttpStatus,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'DATABASE/database.service';
import {
	CreateAdminDto,
	CreateParentDto,
	CreateStudentDto,
	CreateTeacherDto,
	CreateUserWithRole,
} from './dto/create-user-dto';
import { AdminService } from './admin/admin.service';
import { TeacherService } from './teacher/teacher.service';
import { ParentService } from './parent/parent.service';
import { StudentService } from './student/student.service';
import { RoleService } from 'ROLE/role.service';
import { RoleEnum } from 'types/role-type';
import { PrincipalService } from './principal/principal.service';

@Injectable()
export class UserService {
	private readonly tableName: string = 'users';

	constructor(
		private readonly dbService: DatabaseService,
		private readonly roleService: RoleService,
		private readonly adminService: AdminService,
		private readonly principalService: PrincipalService,
		private readonly teacherService: TeacherService,
		private readonly parentService: ParentService,
		private readonly studentService: StudentService
	) {}

	async findByEmail(email: string) {
		const result = await this.dbService.query(
			`SELECT
				users.id AS id,
				users.email,
				users.password,
				roles.name AS role
			FROM
				${this.tableName}
			JOIN
				roles ON users.role_id = roles.id
			WHERE
				users.email = ?`,
			[email]
		);

		if (result.length === 0) {
			throw new NotFoundException({
				code: HttpStatus.NOT_FOUND,
				message: 'User by email not found',
			});
		}

		return result[0];
	}

	async createUserAndReturnId(body: CreateUserWithRole): Promise<number> {
		const { name, email, password, role_id } = body;

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const userResult = await this.dbService.query(
			`INSERT INTO ${this.tableName} (name, email, password, role_id) VALUES (?, ?, ?, ?) RETURNING id`,
			[name, email, hashedPassword, role_id]
		);

		if (userResult.length === 0) {
			throw new NotFoundException({
				code: HttpStatus.NOT_FOUND,
				message: 'User not created',
			});
		}

		return userResult[0].id;
	}

	async createAdmin(body: CreateAdminDto) {
		const { name, email, password, details } = body;
		const db = this.dbService;

		try {
			await db.run('BEGIN TRANSACTION');

			const roleId = await this.roleService.getByName(RoleEnum.ADMIN);

			const userId = await this.createUserAndReturnId({
				name,
				email,
				password,
				role_id: roleId,
			});

			if (!userId) {
				throw new NotFoundException({
					code: HttpStatus.NOT_FOUND,
					message: 'User not found',
				});
			}

			const adminId = await this.adminService.create({
				user_id: userId,
				...details,
			});

			if (!adminId) {
				throw new BadRequestException({
					code: HttpStatus.BAD_REQUEST,
					message: 'Admin creation failed',
				});
			}

			return db.run('COMMIT');
		} catch (error: any) {
			await db.run('ROLLBACK');
			console.log('ROLLBACK: ', error);
			throw error;
		}
	}

	async createPrincipal(body: CreateAdminDto) {
		const { name, email, password, details } = body;
		const db = this.dbService;

		try {
			await db.run('BEGIN TRANSACTION');

			const roleId = await this.roleService.getByName(RoleEnum.PRINCIPAL);

			const userId = await this.createUserAndReturnId({
				name,
				email,
				password,
				role_id: roleId,
			});

			if (!userId) {
				throw new NotFoundException({
					code: HttpStatus.NOT_FOUND,
					message: 'User not created',
				});
			}

			const principalId = await this.principalService.create({
				user_id: userId,
				...details,
			});

			if (!principalId) {
				throw new BadRequestException({
					code: HttpStatus.BAD_REQUEST,
					message: 'Principal creation failed',
				});
			}

			return db.run('COMMIT');
		} catch (error: any) {
			await db.run('ROLLBACK');
			console.log('ROLLBACK: ', error);
			throw error;
		}
	}

	async createTeacher(body: CreateTeacherDto) {
		const { name, email, password, details } = body;
		const db = this.dbService;

		try {
			await db.run('BEGIN TRANSACTION');

			const roleId = await this.roleService.getByName(RoleEnum.TEACHER);

			const userId = await this.createUserAndReturnId({
				name,
				email,
				password,
				role_id: roleId,
			});

			if (!userId) {
				throw new NotFoundException({
					code: HttpStatus.NOT_FOUND,
					message: 'User not found',
				});
			}

			const teacherId = await this.teacherService.create({
				user_id: userId,
				...details,
			});

			if (!teacherId) {
				throw new BadRequestException({
					code: HttpStatus.BAD_REQUEST,
					message: 'Teacher creation failed',
				});
			}

			return db.run('COMMIT');
		} catch (error: any) {
			await db.run('ROLLBACK');
			console.log('ROLLBACK: ', error);
			throw error;
		}
	}

	async createParent(body: CreateParentDto) {
		const { name, email, password, details } = body;
		const db = this.dbService;

		try {
			await db.run('BEGIN TRANSACTION');

			const roleId = await this.roleService.getByName(RoleEnum.PARENT);

			const userId = await this.createUserAndReturnId({
				name,
				email,
				password,
				role_id: roleId,
			});

			if (!userId) {
				throw new NotFoundException({
					code: HttpStatus.NOT_FOUND,
					message: 'User not found',
				});
			}

			const parentId = await this.parentService.create({
				user_id: userId,
				...details,
			});

			if (!parentId) {
				throw new BadRequestException({
					code: HttpStatus.BAD_REQUEST,
					message: 'Teacher creation failed',
				});
			}

			return db.run('COMMIT');
		} catch (error: any) {
			await db.run('ROLLBACK');
			console.log('ROLLBACK: ', error);
			throw error;
		}
	}

	async createStudent(body: CreateStudentDto) {
		const { name, email, password, details } = body;
		const db = this.dbService;

		try {
			await db.run('BEGIN TRANSACTION');

			const roleId = await this.roleService.getByName(RoleEnum.STUDENT);

			const userId = await this.createUserAndReturnId({
				name,
				email,
				password,
				role_id: roleId,
			});

			if (!userId) {
				throw new NotFoundException({
					code: HttpStatus.NOT_FOUND,
					message: 'User not found',
				});
			}

			const studentId = await this.studentService.create({
				user_id: userId,
				...details,
			});

			if (!studentId) {
				throw new BadRequestException({
					code: HttpStatus.BAD_REQUEST,
					message: 'Student creation failed',
				});
			}

			return db.run('COMMIT');
		} catch (error: any) {
			await db.run('ROLLBACK');
			console.log('ROLLBACK: ', error);
			throw error;
		}
	}

	async updateUser(user_id: number, body: CreateUserWithRole) {
		const { name, email, password, role_id } = body;

		return this.dbService.run(
			`UPDATE ${this.tableName} SET name = ?, email = ?, password = ?, role_id = ? WHERE id = ?`,
			[name, email, password, role_id, user_id]
		);
	}

	async deleteUser(user_id: number) {
		return this.dbService.run(
			`DELETE FROM ${this.tableName} WHERE id = ?`,
			[user_id]
		);
	}
}
