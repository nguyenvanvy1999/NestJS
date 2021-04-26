import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppConfigService } from '../config/config.service';
import { UserTool } from './tools/format';
import { userProvider } from './user.provider';
import { BcryptTool } from 'src/tools/bcrypt.tool';
import { JwtStrategy } from 'src/auth/strategies/jwt.stragety';
import { AuthModule } from 'src/auth/auth.module';

@Module({
	imports: [MongooseModule.forFeatureAsync([userProvider]), AuthModule],
	controllers: [UserController],
	providers: [UserService, AppConfigService, UserTool, BcryptTool, JwtStrategy],
	exports: [UserService],
})
export class UserModule {}
