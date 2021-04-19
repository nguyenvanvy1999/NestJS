import { Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configProvider } from './config.provider';
@Module({
	imports: [ConfigModule.forRoot(configProvider), ConfigService],
	providers: [
		{
			provide: AppConfigService,
			useValue: new AppConfigService(new ConfigService()),
		},
	],
	exports: [AppConfigService, ConfigModule, ConfigService],
})
export class AppConfigModule {}
