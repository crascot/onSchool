import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Post,
	UnauthorizedException,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserBaseType } from 'types/user-type';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private jwtService: JwtService
	) {}

	@HttpCode(HttpStatus.OK)
	@Post('/login')
	async signIn(@Body() body: { username: string; password: string }) {
		const { username, password } = body;

		const user: UserBaseType = await this.authService.signIn(username);

		if (!user) {
			throw new NotFoundException('User not found');
		}

		if (user.password !== password) {
			throw new UnauthorizedException();
		}

		const payload = { sub: user.id, username: user.name };

		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}

	@UseGuards(AuthGuard)
	@Get('/test')
	async test() {
		return 'test';
	}
}
