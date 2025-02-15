import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AdminService } from './admin/admin.service';
import {
	CreateAdminDto,
	CreateParentDto,
	CreateStudentDto,
	CreateTeacherDto,
	CreateUserWithRole,
} from './dto/create-user-dto';
import { TeacherService } from './teacher/teacher.service';
import { ParentService } from './parent/parent.service';
import { StudentService } from './student/student.service';
import { PrincipalService } from './principal/principal.service';

@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly adminService: AdminService,
		private readonly principalService: PrincipalService,
		private readonly teacherService: TeacherService,
		private readonly parentService: ParentService,
		private readonly studentService: StudentService
	) {}

	@Get('/admin')
	async getAllAdmins() {
		return this.adminService.getAll();
	}

	@Get('/admin/:user_id')
	async getOneAdmin(@Param('user_id') user_id: string) {
		return this.adminService.getOne(Number(user_id));
	}

	@Post('/admin')
	async createAdmin(@Body() body: CreateAdminDto) {
		return this.userService.createAdmin(body);
	}

	@Get('/principal')
	async getAllPrincipal() {
		return this.principalService.getAll();
	}

	@Get('/principal/:user_id')
	async getOnePrincipal(@Param('user_id') user_id: string) {
		return this.principalService.getOne(Number(user_id));
	}

	@Post('/principal')
	async createPrincipal(@Body() body: CreateAdminDto) {
		return this.userService.createPrincipal(body);
	}

	@Get('/teacher')
	async getAllTeacher() {
		return this.teacherService.getAll();
	}

	@Get('/teacher/:user_id')
	async getOneTeacher(@Param('user_id') user_id: string) {
		return this.teacherService.getOne(Number(user_id));
	}

	@Post('/teacher')
	async createTeacher(@Body() body: CreateTeacherDto) {
		return this.userService.createTeacher(body);
	}

	@Get('/parent')
	async getAllParent() {
		return this.parentService.getAll();
	}
	@Get('/parent/:user_id')
	async getOneParent(@Param('user_id') user_id: string) {
		return this.parentService.getOne(Number(user_id));
	}
	@Post('/parent')
	async createParent(@Body() body: CreateParentDto) {
		return this.userService.createParent(body);
	}

	@Get('/student')
	async getAllStudent() {
		return this.studentService.getAll();
	}

	@Get('/student/:user_id')
	async getOneStudent(@Param('user_id') user_id: string) {
		return this.studentService.getOne(Number(user_id));
	}

	@Post('/student')
	async createStudent(@Body() body: CreateStudentDto) {
		return this.userService.createStudent(body);
	}

	@Put('/:user_id')
	async updateUser(
		@Param('user_id') user_id: string,
		@Body() body: CreateUserWithRole
	) {
		return this.userService.updateUser(Number(user_id), body);
	}

	@Delete('/:user_id')
	async deleteAdmin(@Param('user_id') user_id: string) {
		return this.userService.deleteUser(Number(user_id));
	}
}
