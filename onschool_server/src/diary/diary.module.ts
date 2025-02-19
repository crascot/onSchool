import { Module } from '@nestjs/common';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { DatabaseModule } from 'DATABASE/database.module';
import { StudentModule } from 'USER/student/student.module';

@Module({
	imports: [DatabaseModule, StudentModule],
	controllers: [DiaryController],
	providers: [DiaryService],
	exports: [DiaryService],
})
export class DiaryModule {}
