import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppConfigService } from '../config/config.service';
import { AppConfigModule } from '../config/config.module';
import { UserTool } from './tools/format';
import { userProvider } from './user.provider';
@Module({
	imports: [MongooseModule.forFeatureAsync([userProvider]), AppConfigModule],
	controllers: [UserController],
	providers: [UserService, AppConfigService, UserTool],
})
export class UserModule {}
