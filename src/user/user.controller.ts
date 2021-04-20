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
import { NotFoundException, BadRequestException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UsersResponse } from './dtos/users-return.dto';
import { UserResponse } from './dtos/user-return.dto';
import { SignIn } from './dtos/signin.dto';
import { SignUp } from './dtos/signup.dto';
import { UserService } from './user.service';
import { AppConfigService } from '../config/config.service';
import { UserTool } from './tools/format';
import { BcryptTool } from 'src/tools/bcrypt.tool';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UserDocument } from './user.schema';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly config: AppConfigService,
		private readonly userTool: UserTool,
		private readonly bcrypt: BcryptTool
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
		return this.userTool.removeForMany(users);
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
	// @UseGuards(JwtAuthGuard)
	async test(): Promise<UserDocument> {
		const email = 'string';
		const user = await this.userService.getByEmail(email);
		const isPassword = user.comparePassword('string');
		const test = this.userService.test();
		const config = this.config.salt;
		// return { name: user.getFullName(), isPassword, test, config };
		return user;
	}
}
