import { Body, Controller, Get, HostParam, Ip, Param, Post, Query, Req } from '@nestjs/common';
import {
	ApiBearerAuth,
	ApiTags,
	ApiResponse,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
	ApiNotFoundResponse,
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse,
	ApiHeader,
} from '@nestjs/swagger';
import { NotFoundException, BadRequestException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { JwtPayload } from 'src/auth/dtos/payload.dto';
import { FilmService } from './film.service';
import { async } from 'rxjs';

@ApiTags('film')
@Controller('film')
export class FilmController {
	constructor(private readonly filmService: FilmService) {}
}
