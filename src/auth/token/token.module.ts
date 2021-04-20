import { Module } from '@nestjs/common';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenService } from 'src/auth/token/token.service';
import { Token, TokenSchema } from './token.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			useFactory: (config: ConfigService) => {
				return {
					secret: config.get<string>('SECRET'),
					signOptions: { expiresIn: '15m' },
				};
			},
			inject: [ConfigService],
		}),
		,
		MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
	],
	providers: [TokenService, JwtService, ConfigService],
	exports: [TokenService],
})
export class TokenModule {}
