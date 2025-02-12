import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private jwtService: JwtService
	) {}

	@HttpCode(HttpStatus.OK)
	@Post('/login')
	async login(@Body() body: { email: string; password: string }) {
		const { email, password } = body;
		const user = await this.authService.validateUser(email, password);

		if (!user) {
			throw new Error('Invalid credentials');
		}

		return this.authService.login(user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('/test')
	async test() {
		return 'test';
	}
}
