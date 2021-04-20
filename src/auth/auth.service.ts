import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserTool } from '../user/tools/format';
import { Payload } from './interfaces/payload.interface';
@Injectable()
export class AuthService {
	constructor(private userService: UserService, private jwtService: JwtService, private readonly userTool: UserTool) {}

	async validateUser(payload: Payload): Promise<any> {
		const user = await this.userService.getByID(payload._id);
		if (user) return this.userTool.removeForOne(user);
		return null;
	}
	async login(user: Payload) {
		const payload = { _id: user._id };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}
	async;
}
