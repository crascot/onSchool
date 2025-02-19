import { Module } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { DatabaseModule } from 'DATABASE/database.module';
import { ClassModule } from 'CLASS/class.module';

@Module({
	imports: [DatabaseModule, ClassModule],
	controllers: [ScheduleController],
	providers: [ScheduleService],
	exports: [ScheduleService],
})
export class ScheduleModule {}
