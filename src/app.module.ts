import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mongoOption } from './config/mongo.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppConfigService } from './config/config.service';
import { AppConfigModule } from './config/config.module';
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
	],
})
export class AppModule {}
