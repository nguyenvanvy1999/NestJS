import { Module, Logger } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AppConfigModule } from './config/config.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { MongoModule } from './mongodb/mongo.module';
import { ServerStaticModule } from './static/static.module';

@Module({
	imports: [ServerStaticModule, MongoModule, AppConfigModule, UserModule],
	controllers: [AppController],
	providers: [AppService, Logger],
})
export class AppModule {}
