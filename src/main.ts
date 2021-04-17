import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as express from 'express';
import * as path from 'path';
import * as favicon from 'serve-favicon';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: ['error', 'warn', 'debug', 'log', 'verbose'],
	});

	app.enableCors();
	app.use(helmet());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(favicon(path.join(__dirname, '../public/favicon.ico')));
	// app.use(csurf());
	const config = new DocumentBuilder()
		.setTitle('Mesthing API')
		.setDescription('Test API ver 1')
		.setVersion('1.0')
		.addTag('user')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, document);
	await app.listen(3000);
}
bootstrap();
