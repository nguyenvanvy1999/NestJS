import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserTool } from '../user/tools/format';
import { TokenService } from './token/token.service';
import { SignIn } from 'src/user/dtos/signin.dto';
import { SignInReturn } from '../user/dtos/signin-response';

@Injectable()
export class AuthService {
	constructor(private userService: UserService, private readonly tokenService: TokenService) {}
	async login(signIn: SignIn): Promise<SignInReturn> {
		const user = await this.userService.getByEmail(signIn.email);
		if (!user || !user.comparePassword(signIn.password)) throw new BadRequestException('Email or password wrong !');
		return {
			accessToken: await this.tokenService.signAccessToken(user._id.toString()),
			refreshToken: await this.tokenService.signRefreshToken(user._id.toString()),
		};
	}

	async logout(refreshToken: string): Promise<void> {
		try {
			await this.tokenService.deleteRefreshToken(refreshToken);
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async refreshToken(refreshToken: string): Promise<SignInReturn> {
		try {
			const decoded = await this.tokenService.validateToken(refreshToken);
			const accessToken = await this.tokenService.signAccessToken(decoded._id);
			const newRefreshToken = await this.tokenService.signRefreshToken(decoded._id);
			await this.tokenService.updateRefreshToken(refreshToken, newRefreshToken);
			return {
				accessToken,
				refreshToken: newRefreshToken,
			};
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async logoutAllDevice(refreshToken: string): Promise<void> {
		try {
			await this.tokenService.deleteRefreshTokenUser(refreshToken);
			return;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}
