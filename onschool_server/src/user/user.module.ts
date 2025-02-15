import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from 'DATABASE/database.module';
import { UserService } from './user.service';
import { AdminModule } from './admin/admin.module';
import { TeacherModule } from './teacher/teacher.module';
import { ParentModule } from './parent/parent.module';
import { StudentModule } from './student/student.module';
import { DiaryModule } from 'diary/diary.module';
import { ClassModule } from 'CLASS/class.module';
import { RoleModule } from 'ROLE/role.module';
import { PrincipalModule } from './principal/principal.module';

@Module({
	imports: [
		DatabaseModule,
		RoleModule,
		PrincipalModule,
		AdminModule,
		TeacherModule,
		ParentModule,
		StudentModule,
		DiaryModule,
		ClassModule,
	],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
