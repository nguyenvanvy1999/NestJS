import { Module } from '@nestjs/common';
import { mongoProvider } from './mongo.provider';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [MongooseModule.forRootAsync(mongoProvider)],
})
export class MongoModule {}
