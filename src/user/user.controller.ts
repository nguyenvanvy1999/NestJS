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
import { UserResponse, UsersResponse, Error } from './interfaces/user.response.dto';
import { SignIn, SignUp } from './interfaces/user.request.dto';
import { UserService } from './user.service';
import { AppConfigService } from '../config/config.service';
import { UserTool } from './tools/format';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly configService: AppConfigService,
		private readonly userTool: UserTool
	) {}

	@Post()
	@ApiCreatedResponse({ type: UserResponse })
	@ApiInternalServerErrorResponse({ description: 'Server error !' })
	async create(@Body() user: SignUp): Promise<UserResponse> {
		const newUser = await this.userService.newUser(user);
		return this.userTool.removeForOne(newUser);
	}

	@Get()
	@ApiResponse({ type: UsersResponse })
	async findAll(): Promise<UsersResponse> {
		const users = await this.userService.getAll();
		return { users: this.userTool.removeForMany(users), count: users.length };
	}

	@Post('signin')
	async signIn(@Body() data: SignIn): Promise<string> {
		const user = await this.userService.getByEmail(data.email);
		if (!user) throw new UnauthorizedException('Email wrong !');
		if (!user.comparePassword(data.password)) throw new UnauthorizedException('Password wrong !');
		return 'Sign Successfully !';
	}

	@Get('email')
	@ApiOkResponse({ type: UserResponse })
	@ApiNotFoundResponse({ type: Error })
	async getUserByEmail(@Query('email') email: string): Promise<UserResponse> {
		const user = await this.userService.getByEmail(email);
		if (!user) throw new NotFoundException('Not found user !');
		return this.userTool.removeForOne(user);
	}

	@Get('test')
	async test() {
		const email = 'string';
		const user = await this.userService.getByEmail(email);
		const isPassword = user.comparePassword('string');
		const test = this.userService.test();
		const config = this.configService.salt;
		return { name: user.getFullName(), isPassword, test, config };
	}
}
