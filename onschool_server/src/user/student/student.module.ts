import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { DatabaseModule } from 'DATABASE/database.module';

@Module({
	imports: [DatabaseModule],
	providers: [StudentService],
})
export class StudentModule {}
