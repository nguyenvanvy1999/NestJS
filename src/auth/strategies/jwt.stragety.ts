import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Payload } from '../dtos/payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly config: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				ExtractJwt.fromAuthHeaderAsBearerToken(),
				ExtractJwt.fromHeader('token'),
			]),
			ignoreExpiration: false,
			secretOrKey: config.get<string>('SECRET'),
		});
	}

	async validate(payload: Payload) {
		return { _id: payload._id };
	}
}
