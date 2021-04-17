import { Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configModule } from './tools/env.config';
@Module({
	imports: [ConfigModule.forRoot(configModule), ConfigService],
	providers: [
		{
			provide: AppConfigService,
			useValue: new AppConfigService(new ConfigService()),
		},
	],
	exports: [AppConfigService, ConfigModule, ConfigService],
})
export class AppConfigModule {}
