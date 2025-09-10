import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { AdminService } from "./admin/admin.service";
import { CreateAdminDto, CreateParentDto, CreateStudentDto, CreateTeacherDto, CreateUserWithRole } from "./dto/create-user-dto";
import { TeacherService } from "./teacher/teacher.service";
import { ParentService } from "./parent/parent.service";
import { StudentService } from "./student/student.service";
import { PrincipalService } from "./principal/principal.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly adminService: AdminService,
    private readonly principalService: PrincipalService,
    private readonly teacherService: TeacherService,
    private readonly parentService: ParentService,
    private readonly studentService: StudentService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get("/admin")
  async getAllAdmins() {
    return this.adminService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get("/admin/:user_id")
  async getOneAdmin(@Param("user_id") user_id: string) {
    return this.adminService.getOne(Number(user_id));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("/admin")
  async createAdmin(@Body() body: CreateAdminDto) {
    await this.userService.createAdmin(body);

    return { code: HttpStatus.CREATED, message: "Admin created" };
  }

  @HttpCode(HttpStatus.OK)
  @Get("/principal")
  async getAllPrincipal() {
    return this.principalService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get("/principal/:user_id")
  async getOnePrincipal(@Param("user_id") user_id: string) {
    return this.principalService.getOne(Number(user_id));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("/principal")
  async createPrincipal(@Body() body: CreateAdminDto) {
    await this.userService.createPrincipal(body);

    return { code: HttpStatus.CREATED, message: "Principal created" };
  }

  @HttpCode(HttpStatus.OK)
  @Get("/teacher")
  async getAllTeacher() {
    return this.teacherService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get("/teacher/:user_id")
  async getOneTeacher(@Param("user_id") user_id: string) {
    return this.teacherService.getOne(Number(user_id));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("/teacher")
  async createTeacher(@Body() body: CreateTeacherDto) {
    await this.userService.createTeacher(body);

    return { code: HttpStatus.CREATED, message: "Teacher created" };
  }

  @HttpCode(HttpStatus.OK)
  @Get("/parent")
  async getAllParent() {
    return this.parentService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get("/parent/:user_id")
  async getOneParent(@Param("user_id") user_id: string) {
    return this.parentService.getOne(Number(user_id));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("/parent")
  async createParent(@Body() body: CreateParentDto) {
    await this.userService.createParent(body);

    return { code: HttpStatus.CREATED, message: "Parent created" };
  }

  @HttpCode(HttpStatus.OK)
  @Get("/student")
  async getAllStudent() {
    return this.studentService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get("/student/:user_id")
  async getOneStudent(@Param("user_id") user_id: string) {
    return this.studentService.getOne(Number(user_id));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("/student")
  async createStudent(@Body() body: CreateStudentDto) {
    await this.userService.createStudent(body);

    return { code: HttpStatus.CREATED, message: "Student created" };
  }

  @HttpCode(HttpStatus.OK)
  @Put("/:user_id")
  async updateUser(@Param("user_id") user_id: string, @Body() body: CreateUserWithRole) {
    await this.userService.updateUser(Number(user_id), body);

    return { code: HttpStatus.OK, message: "Update user data" };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete("/:user_id")
  async deleteUser(@Param("user_id") user_id: string) {
    await this.userService.deleteUser(Number(user_id));

    return { code: HttpStatus.CREATED, message: "User deleted" };
  }
}
