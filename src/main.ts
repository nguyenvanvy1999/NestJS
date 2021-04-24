import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './tools/logger.tool';

import { StartApp } from './setup';
const app = new StartApp(NestFactory.create(AppModule, { logger: AppLogger }));
app.startServer();
