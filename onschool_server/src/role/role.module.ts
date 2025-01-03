import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { DatabaseModule } from 'DATABASE/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [RoleController],
})
export class RoleModule {}
