import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { DatabaseModule } from 'DATABASE/database.module';

@Module({
	imports: [DatabaseModule],
	controllers: [UserController],
})
export class UserModule {}
