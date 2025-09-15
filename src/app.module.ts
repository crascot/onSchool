import { Module } from "@nestjs/common";
import { AuthModule } from "AUTH/auth.module";
import { ConfigModule } from "@nestjs/config";
import { ClassModule } from "CLASS/class.module";
import { DatabaseModule } from "DATABASE/database.module";
import { RoleModule } from "ROLE/role.module";
import { SchoolModule } from "SCHOOL/school.module";
import { UserModule } from "USER/user.module";
import { TaskModule } from "./task/task.module";
import configuration from "CONFIG/configuration";
import { LessonModule } from "LESSON/lesson.module";
import { DiaryModule } from "DIARY/diary.module";
import { GradeModule } from "GRADE/grade.module";
import { ScheduleModule } from "SCHEDULE/schedule.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true,
    }),
    UserModule,
    RoleModule,
    DatabaseModule,
    LessonModule,
    DiaryModule,
    GradeModule,
    ClassModule,
    AuthModule,
    ScheduleModule,
    SchoolModule,
    TaskModule,
  ],
})
export class AppModule {}
