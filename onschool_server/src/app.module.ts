import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';
import { DatabaseModule } from './database/database.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env`,
		}),
		UserModule,
		RoleModule,
		DatabaseModule,
	],
})
export class AppModule {}
