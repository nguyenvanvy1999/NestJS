import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mongoOption } from './config/mongo.config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { configModule } from './config/env.validate';

@Module({
  imports: [
    ConfigModule.forRoot(configModule),
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
    UserModule,
  ],
})
export class AppModule {}
