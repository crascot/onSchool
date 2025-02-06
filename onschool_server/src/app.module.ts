import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { DatabaseModule } from './database/database.module';
import { LessonModule } from './lesson/lesson.module';
import { DiaryModule } from './diary/diary.module';
import { GradeModule } from './grade/grade.module';
import { ClassModule } from './class/class.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from './schedule/schedule.module';
import { SchoolModule } from './school/school.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env`,
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
	],
})
export class AppModule {}
