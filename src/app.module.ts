import { Module, Logger } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppConfigModule } from './config/config.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MongoModule } from './mongodb/mongo.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: join(__dirname, '..', 'public'),
		}),
		MongoModule,
		AppConfigModule,
		AuthModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService, Logger, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
