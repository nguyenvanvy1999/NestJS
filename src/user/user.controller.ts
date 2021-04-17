import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import {
	ApiBearerAuth,
	ApiTags,
	ApiResponse,
	ApiCreatedResponse,
	ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	@ApiCreatedResponse({ description: 'The user has been successfully created.' })
	@ApiInternalServerErrorResponse({ description: 'Server error !' })
	async create(@Body() user: User): Promise<string> {
		return 'Hello';
	}

	@Get()
	async findAll(): Promise<User[]> {
		return await this.userService.getAll();
	}
}
