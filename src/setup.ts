import helmet from 'helmet';
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import morgan from 'morgan';
import { stream } from './tools/logger.tool';
import { INestApplication } from '@nestjs/common';

export class StartApp {
	private readonly app: Promise<INestApplication>;
	constructor(app: Promise<INestApplication>) {
		this.app = app;
		this.initializeMiddlewares();
		this.initializeSwagger();
	}

	private async initializeMiddlewares() {
		const server = await this.app;
		server.enableCors();
		server.use(morgan(':method :url :status :res[content-length] - :response-time ms', { stream: stream }));
		server.use(helmet());
		server.use(express.json());
		server.use(express.urlencoded({ extended: true }));
		server.use(favicon(path.join(__dirname, '../public/favicon.ico')));
	}
	private async initializeSwagger() {
		const server = await this.app;
		const config = new DocumentBuilder()
			.addBearerAuth()
			.setTitle('Mesthing API')
			.setDescription('IOT API ver 1')
			.setVersion('1.0')
			.addTag('user')
			.build();
		const document = SwaggerModule.createDocument(server, config);
		SwaggerModule.setup('apis', server, document);
	}

	public async startServer() {
		const server = await this.app;
		await server.listen(3000);
	}
}
