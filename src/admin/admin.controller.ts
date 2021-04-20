import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiTags,
	ApiResponse,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	getSchemaPath,
} from '@nestjs/swagger';
import { NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AppConfigService } from '../config/config.service';

@ApiTags('user')
@Controller('user')
export class AdminController {
	constructor(private readonly adminService: AdminService, private readonly configService: AppConfigService) {}
}
