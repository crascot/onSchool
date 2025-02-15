import { Module } from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { DatabaseModule } from 'DATABASE/database.module';

@Module({
	imports: [DatabaseModule],
	providers: [TeacherService],
	exports: [TeacherService],
})
export class TeacherModule {}
