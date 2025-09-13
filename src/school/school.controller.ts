import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { SchoolService } from "./school.service";
import { CreateSchoolDto } from "./dto/create-school-dto";

@Controller("school")
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  async getAll() {
    return this.schoolService.getAll();
  }

  @HttpCode(HttpStatus.OK)
  @Get(":school_id")
  async getSchool(@Param("school_id") school_id: string) {
    return this.schoolService.getSchool(Number(school_id));
  }

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() body: CreateSchoolDto) {
    await this.schoolService.create(body);

    return { code: HttpStatus.CREATED, message: "School created" };
  }

  @HttpCode(HttpStatus.OK)
  @Put(":school_id")
  async update(@Param("school_id") school_id: string, @Body() body: CreateSchoolDto) {
    await this.schoolService.getSchool(Number(school_id));

    await this.schoolService.update(body, Number(school_id));

    return { code: HttpStatus.OK, message: "School updated" };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(":school_id")
  async delete(@Param("school_id") school_id: string) {
    await this.schoolService.getSchool(Number(school_id));

    await this.schoolService.delete(Number(school_id));

    return { code: HttpStatus.NO_CONTENT, message: "School deleted" };
  }
}
