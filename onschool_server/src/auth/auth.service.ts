import { Injectable } from '@nestjs/common';
import { UserService } from 'USER/user.service';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async signIn(username: string) {
		const user = await this.userService.findByName(username);

		return user;
	}
}
