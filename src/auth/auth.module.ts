import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
	imports: [
		UserModule,
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
	providers: [AuthService],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
