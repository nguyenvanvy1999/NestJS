import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { RefreshToken } from './token.schema';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { v4 } from 'uuid';
import { Request } from 'express';
import { getClientIp } from 'request-ip';
import { JwtPayload } from './dtos/payload.dto';
import crypto from 'crypto-js';
import { UserResponse } from 'src/user/dtos/user-return.dto';
import { UserTool } from 'src/user/tools/format';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel('User') private readonly userModel: Model<User>,
		@InjectModel('RefreshToken') private readonly refreshTokenModel: Model<RefreshToken>,
		private readonly jwtService: JwtService,
		private readonly config: ConfigService,
		private userTool: UserTool
	) {}
	async createAccessToken(userId: string): Promise<string> {
		const token = await this.jwtService.signAsync(
			{ userId },
			{
				secret: this.config.get<string>('JWT_SECRET'),
				expiresIn: this.config.get<string>('JWT_EXPIRATION'),
			}
		);
		return this.encrypt(token);
	}
	async createRefreshToken(req: Request, userId: string): Promise<string> {
		const refreshToken = new this.refreshTokenModel({
			userId,
			refreshToken: v4(),
			ip: this.getIp(req),
			browser: this.getBrowserInfo(req),
			country: this.getCountry(req),
		});
		await refreshToken.save();
		return refreshToken.refreshToken;
	}
	async findRefreshToken(token: string) {
		const refreshToken = await this.refreshTokenModel.findOne({ refreshToken: token });
		if (!refreshToken) {
			throw new UnauthorizedException('User has been logged out.');
		}
		return refreshToken.userId;
	}
	async validateUser(jwtPayload: JwtPayload): Promise<UserResponse> {
		const user = await this.userModel.findOne({ _id: jwtPayload.userId });
		if (!user) {
			throw new UnauthorizedException('User not found!');
		}
		return this.userTool.removeForOne(user);
	}

	async verifyJwt(jwt: string) {
		try {
			const decoded = this.decrypt(jwt);
			await this.jwtService.verifyAsync(decoded, { secret: this.config.get<string>('SECRET') });
		} catch (error) {
			throw new UnauthorizedException(error);
		}
	}
	private encrypt(text: string): string {
		return crypto.AES.encrypt(text, this.config.get<string>('SECRET')).toString();
	}
	private decrypt(text: string): string {
		return crypto.AES.decrypt(text, this.config.get<string>('SECRET')).toString();
	}
	private getIp(req: Request): string {
		return getClientIp(req);
	}
	private getBrowserInfo(req: Request): string {
		return req.header['user-agent'] || 'XX';
	}
	private getCountry(req: Request): string {
		return req.header['cf-ipcountry'] ? req.header['cf-ipcountry'] : 'XX';
	}
}
