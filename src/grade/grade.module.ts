import { Module } from "@nestjs/common";
import { GradeController } from "./grade.controller";
import { GradeService } from "./grade.service";
import { DatabaseModule } from "DATABASE/database.module";
import { DiaryModule } from "DIARY/diary.module";
import { LessonModule } from "LESSON/lesson.module";

@Module({
  imports: [DatabaseModule, DiaryModule, LessonModule],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}
