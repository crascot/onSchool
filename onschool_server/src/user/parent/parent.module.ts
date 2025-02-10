import { Module } from '@nestjs/common';
import { ParentService } from './parent.service';
import { DatabaseModule } from 'DATABASE/database.module';

@Module({
	imports: [DatabaseModule],
	providers: [ParentService],
})
export class ParentModule {}
