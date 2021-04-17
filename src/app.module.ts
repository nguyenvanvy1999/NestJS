import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mongoOption } from './config/tools/mongo.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppConfigModule } from './config/config.module';
import { DeviceModule } from './device/device.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { WinstonModule } from 'nest-winston';
@Module({
	imports: [
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: (configService: ConfigService) => ({
				uri: configService.get<string>('MONGO_URI'),
				...mongoOption,
			}),
			inject: [ConfigService],
		}),
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'),
		}),
		AppConfigModule,
		UserModule,
		DeviceModule,
	],
	controllers: [AppController],
	providers: [AppService, Logger],
})
export class AppModule {}
