import { Module } from '@nestjs/common';
import { DiaryController } from './diary.controller';
import { DiaryService } from './diary.service';
import { DatabaseModule } from 'DATABASE/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [DiaryController],
	providers: [DiaryService],
	exports: [DiaryService],
})
export class DiaryModule {}
