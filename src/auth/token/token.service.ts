import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Token, TokenDocument } from './token.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomBytes } from 'crypto';
import * as moment from 'moment';
import { Types } from 'mongoose';
import uuid = require('uuid');
import { AppLogger } from '../../logger/logger.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../dtos/payload.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class TokenService {
	constructor(
		@InjectModel(Token.name) private readonly tokenModel: Model<TokenDocument>,
		private readonly config: ConfigService,
		private readonly jwtService: JwtService
	) {}
	async signAccessToken(_id: string): Promise<string> {
		try {
			const jwt = await this.jwtService.signAsync(_id, {
				secret: this.config.get<string>('SECRET'),
				algorithm: 'RS256',
				expiresIn: '15m',
			});
			return jwt;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
	async signRefreshToken(_id: string): Promise<string> {
		try {
			const jwt = await this.jwtService.signAsync(_id, {
				secret: this.config.get<string>('SECRET'),
				algorithm: 'RS256',
				expiresIn: '15days',
			});
			return jwt;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
	async validateToken(token: string): Promise<JwtPayload> {
		try {
			return (await this.jwtService.verifyAsync(token, { secret: this.config.get<string>('SECRET') })) as JwtPayload;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async deleteRefreshToken(refreshToken: string): Promise<void> {
		try {
			const decoded = await this.validateToken(refreshToken);
			await this.tokenModel.findOneAndDelete({ value: refreshToken });
			return;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
	async deleteRefreshTokenUser(refreshToken: string): Promise<void> {
		try {
			const decoded = await this.validateToken(refreshToken);
			await this.tokenModel.findOneAndDelete({ userId: decoded._id });
			return;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
	async updateRefreshToken(oldToken: string, newToken: string): Promise<void> {
		try {
			await this.tokenModel.findOneAndUpdate({ value: oldToken }, { value: newToken });
			return;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}
