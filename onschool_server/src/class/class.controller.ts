import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { ClassService } from "./class.service";
import { CreateClassDto } from "./dto/create-class-dto";
import { Roles } from "ROLE/role.decorator";
import { RoleEnum } from "types/role-type";
import { SchoolService } from "SCHOOL/school.service";

@Controller("class")
export class ClassController {
  constructor(
    private readonly classService: ClassService,
    private readonly schoolService: SchoolService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll() {
    return this.classService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(":class_id")
  async getClass(@Param("class_id") class_id: string) {
    return this.classService.getClass(Number(class_id));
  }

  @HttpCode(HttpStatus.CREATED)
  @Roles(RoleEnum.ADMIN, RoleEnum.PRINCIPAL)
  @Post()
  async create(@Body() body: CreateClassDto) {
    await this.validate(body);

    await this.classService.create(body);

    return { code: HttpStatus.CREATED, message: "Class created" };
  }

  @HttpCode(HttpStatus.OK)
  @Roles(RoleEnum.ADMIN, RoleEnum.PRINCIPAL)
  @Put(":class_id")
  async update(@Param("class_id") class_id: string, @Body() body: CreateClassDto) {
    await this.validate(body, Number(class_id));

    await this.classService.update(class_id, body);

    return { code: HttpStatus.OK, message: "Class updated" };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Roles(RoleEnum.ADMIN, RoleEnum.PRINCIPAL)
  @Delete(":class_id")
  async delete(@Param("class_id") class_id: string) {
    await this.classService.getClass(Number(class_id));

    await this.classService.delete(class_id);

    return { code: HttpStatus.NO_CONTENT, message: "Class deleted" };
  }

  private async validate(body: CreateClassDto, class_id?: number) {
    const { school_id } = body;

    if (class_id) {
      await this.classService.getClass(class_id);
    }

    await this.schoolService.getSchool(Number(school_id));
  }
}
