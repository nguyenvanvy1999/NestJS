import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigService } from '../config/config.service';
import { AppConfigModule } from '../config/config.module';
import { adminProvider } from './admin.provider';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
	imports: [MongooseModule.forFeatureAsync([adminProvider]), AppConfigModule],
	controllers: [AdminController],
	providers: [AppConfigService, AdminService],
})
export class UserModule {}
