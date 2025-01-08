import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from 'DATABASE/database.module';
import { UserService } from './user.service';
import { AdminModule } from './admin/admin.module';
import { TeacherService } from './teacher/teacher.service';
import { TeacherModule } from './teacher/teacher.module';
import { ParentModule } from './parent/parent.module';
import { StudentModule } from './student/student.module';

@Module({
	imports: [DatabaseModule, AdminModule, TeacherModule, ParentModule, StudentModule],
	controllers: [UserController],
	providers: [UserService, TeacherService],
})
export class UserModule {}
