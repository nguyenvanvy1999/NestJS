import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
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
import { UsersResponse } from './dtos/users-return.dto';
import { UserResponse } from './dtos/user-return.dto';
import { SignIn } from './dtos/signin.dto';
import { SignUp } from './dtos/signup.dto';
import { UserService } from './user.service';
import { AppConfigService } from '../config/config.service';
import { UserTool } from './tools/format';
import { BcryptTool } from 'src/tools/bcrypt.tool';
import { UserDocument } from './user.schema';
import { AuthService } from 'src/auth/auth.service';
import { SignInReturn } from './dtos/signin-response';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly config: AppConfigService,
		private readonly userTool: UserTool,
		private readonly bcrypt: BcryptTool,
		private readonly authService: AuthService
	) {}

	@Post()
	@ApiCreatedResponse({ type: UserResponse })
	@ApiInternalServerErrorResponse({ description: 'Server error !' })
	@ApiOperation({ description: 'create new user' })
	async create(@Body() user: SignUp): Promise<UserResponse> {
		const newUser = await this.userService.newUser(user);
		return this.userTool.removeForOne(newUser);
	}

	@Get()
	@ApiResponse({ type: UsersResponse })
	@ApiOperation({ description: 'find all user' })
	async findAll(): Promise<UsersResponse> {
		const users = await this.userService.getAll();
		return this.userTool.removeForMany(users);
	}

	@Post('signin')
	@ApiOperation({ description: 'Sign in' })
	@ApiResponse({ type: SignInReturn })
	@ApiUnauthorizedResponse({ description: 'Email or password wrong ' })
	async signIn(@Body() body: SignIn, @Req() req: Request): Promise<SignInReturn> {
		const user = await this.userService.getByEmail(body.email);
		if (!user || !this.bcrypt.compareSync(body.password, user.password))
			throw new UnauthorizedException('Email or password wrong !');
		const refreshToken = await this.authService.createRefreshToken(req, user._id.toString());
		const accessToken = await this.authService.createAccessToken(user._id.toString());
		return { accessToken, refreshToken };
	}

	@Get('email')
	@ApiOperation({ description: 'Get user by email' })
	@ApiOkResponse({ type: UserResponse })
	@ApiNotFoundResponse({ type: Error, description: 'Not found user' })
	async getUserByEmail(@Query('email') email: string): Promise<UserResponse> {
		const user = await this.userService.getByEmail(email);
		if (!user) throw new NotFoundException('Not found user !');
		return this.userTool.removeForOne(user);
	}

	@Post('test')
	@ApiBearerAuth()
	@ApiOperation({ description: 'A private route for check the auth' })
	@ApiHeader({
		name: 'Bearer',
		description: 'the token we need for auth.',
	})
	@UseGuards(JwtAuthGuard)
	async test(@Body() body: SignIn, @Req() req: Request) {
		return 'test';
	}
}
