import { Module } from '@nestjs/common';
import { AuthModule } from 'AUTH/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClassModule } from 'CLASS/class.module';
import { DatabaseModule } from 'DATABASE/database.module';
import { RoleModule } from 'ROLE/role.module';
import { SchoolModule } from 'SCHOOL/school.module';
import { UserModule } from 'USER/user.module';
import { DiaryModule } from 'diary/diary.module';
import { GradeModule } from 'grade/grade.module';
import { LessonModule } from 'lesson/lesson.module';
import { ScheduleModule } from 'schedule/schedule.module';
import configuration from 'config/configuration';

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [configuration],
			envFilePath: `.${process.env.NODE_ENV}.env`,
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
	],
})
export class AppModule {}
