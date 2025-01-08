import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'DATABASE/database.module';
import { UserModule } from 'USER/user.module';

@Module({
	imports: [DatabaseModule, UserModule],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
