import { Injectable } from '@nestjs/common';
import { SignIn } from 'src/user/interfaces/user.request.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
	constructor(private readonly userService: UserService) {}

	async validateUser(email: string, password: string) {
		const user = await this.userService.getByEmail(email);
		if (!user || !user.comparePassword(password)) return false;
		return true;
	}
}
