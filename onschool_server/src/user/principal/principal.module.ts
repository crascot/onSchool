import { Module } from '@nestjs/common';
import { DatabaseModule } from 'DATABASE/database.module';
import { PrincipalService } from './principal.service';

@Module({
	imports: [DatabaseModule],
	providers: [PrincipalService],
	exports: [PrincipalService],
})
export class PrincipalModule {}
