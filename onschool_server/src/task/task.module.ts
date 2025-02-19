import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { DatabaseModule } from 'DATABASE/database.module';
import { ClassModule } from 'CLASS/class.module';
import { LessonModule } from 'lesson/lesson.module';
import { StudentModule } from 'USER/student/student.module';

@Module({
	imports: [DatabaseModule, ClassModule, LessonModule, StudentModule],
	controllers: [TaskController],
	providers: [TaskService],
})
export class TaskModule {}
