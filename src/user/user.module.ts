import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppConfigService } from '../config/config.service';
import { UserTool } from './tools/format';
import { userProvider } from './user.provider';
import { BcryptTool } from 'src/tools/bcrypt.tool';
import { JwtStrategy } from 'src/auth/strategies/jwt.stragety';

@Module({
	imports: [MongooseModule.forFeatureAsync([userProvider])],
	controllers: [UserController],
	providers: [UserService, AppConfigService, UserTool, BcryptTool, JwtStrategy],
	exports: [UserService],
})
export class UserModule {}
