import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { SchoolService } from './school.service';
import { DatabaseModule } from 'DATABASE/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [SchoolController],
	providers: [SchoolService],
	exports: [SchoolService],
})
export class SchoolModule {}
