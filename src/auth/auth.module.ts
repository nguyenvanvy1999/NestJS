import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { TokenService } from './token/token.service';
import { TokenModule } from './token/token.module';
import { UserService } from 'src/user/user.service';

@Module({
	imports: [
		TokenModule,
		UserModule,
		PassportModule.register({
			defaultStrategy: 'jwt',
		}),
	],
	providers: [AuthService, TokenService, UserService],
	exports: [AuthService],
})
export class AuthModule {}
