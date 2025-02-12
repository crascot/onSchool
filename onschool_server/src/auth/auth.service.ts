import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserBaseType } from 'types/user-type';
import { UserService } from 'USER/user.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly jwtService: JwtService,
		private readonly userService: UserService
	) {}

	async validateUser(
		email: string,
		password: string
	): Promise<UserBaseType | null> {
		const user = await this.userService.findByEmail(email);
		if (user && (await bcrypt.compare(password, user.password))) {
			return user;
		}
		return null;
	}

	async login(user: UserBaseType) {
		const payload = { email: user.email, sub: user.id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	async hashPassword(password: string): Promise<string> {
		const salt = await bcrypt.genSalt();
		return bcrypt.hash(password, salt);
	}
}
