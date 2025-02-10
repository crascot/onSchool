import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from 'DATABASE/database.module';
import { UserService } from './user.service';
import { AdminModule } from './admin/admin.module';
import { TeacherService } from './teacher/teacher.service';
import { TeacherModule } from './teacher/teacher.module';
import { ParentModule } from './parent/parent.module';
import { StudentModule } from './student/student.module';
import { AdminService } from './admin/admin.service';
import { ParentService } from './parent/parent.service';
import { StudentService } from './student/student.service';
import { DiaryModule } from 'diary/diary.module';
import { DiaryService } from 'diary/diary.service';
import { ClassModule } from 'CLASS/class.module';
import { ClassService } from 'CLASS/class.service';

@Module({
	imports: [
		DatabaseModule,
		AdminModule,
		TeacherModule,
		ParentModule,
		StudentModule,
		DiaryModule,
		ClassModule,
	],
	controllers: [UserController],
	providers: [
		UserService,
		AdminService,
		TeacherService,
		ParentService,
		StudentService,
		DiaryService,
		ClassService,
	],
	exports: [UserService],
})
export class UserModule {}
