import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'USER/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt-strategy';

@Module({
	imports: [
		UserModule,
		JwtModule.register({
			global: true,
			secret: process.env.JWT_SECRET || 'default',
			signOptions: {
				expiresIn: '1d',
			},
		}),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
