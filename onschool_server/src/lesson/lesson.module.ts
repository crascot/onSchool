import { Module } from "@nestjs/common";
import { LessonController } from "./lesson.controller";
import { LessonService } from "./lesson.service";
import { DatabaseModule } from "DATABASE/database.module";
import { ClassModule } from "CLASS/class.module";
import { ScheduleModule } from "schedule/schedule.module";

@Module({
  imports: [DatabaseModule, ClassModule, ScheduleModule],
  controllers: [LessonController],
  providers: [LessonService],
  exports: [LessonService],
})
export class LessonModule {}
