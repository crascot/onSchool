import { Module } from '@nestjs/common';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { DatabaseModule } from 'DATABASE/database.module';
import { SchoolModule } from 'SCHOOL/school.module';

@Module({
	imports: [DatabaseModule, SchoolModule],
	controllers: [ClassController],
	providers: [ClassService],
	exports: [ClassService],
})
export class ClassModule {}
