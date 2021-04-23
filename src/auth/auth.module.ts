import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/user/user.schema';
import { RefreshTokenSchema } from './token.schema';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.stragety';
import { UserTool } from '../user/tools/format';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'User', schema: UserSchema },
			{ name: 'RefreshToken', schema: RefreshTokenSchema },
		]),
		PassportModule.register({
			defaultStrategy: 'jwt',
		}),
		JwtModule.registerAsync({
			useFactory: (config: ConfigService) => {
				return {
					secret: config.get<string>('SECRET'),
					signOptions: { expiresIn: '15m' },
				};
			},
			inject: [ConfigService],
		}),
	],
	providers: [AuthService, JwtStrategy, UserTool],
	exports: [AuthService],
})
export class AuthModule {}
