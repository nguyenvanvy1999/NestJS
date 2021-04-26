import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, Req } from '@nestjs/common';
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
	ApiBadRequestResponse,
	ApiBody,
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
import { AuthService } from 'src/auth/auth.service';
import { SignInReturn } from './dtos/signin-response';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from '../auth/decorators/user.decorator';
import { JwtPayload } from 'src/auth/dtos/payload.dto';
import { ChangerPassword } from './dtos/changer-password';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from './dtos/role.enum';
import { Public } from 'src/auth/guards/public.guard';

@ApiTags('user')
@Controller('user')
@UseGuards(RolesGuard)
export class UserController {
	constructor(
		private readonly userService: UserService,
		private readonly userTool: UserTool,
		private readonly bcrypt: BcryptTool,
		private readonly authService: AuthService
	) {}
	@Get()
	@ApiBearerAuth()
	@ApiOperation({ description: 'Get user profile' })
	@ApiOkResponse({ type: UserResponse })
	@ApiNotFoundResponse({ description: 'User profile not found!' })
	async userProfile(@User() payload: JwtPayload): Promise<UserResponse> {
		const user = await this.userService.getByID(payload.userId);
		if (!user) throw new NotFoundException('User profile not found');
		return this.userTool.removeForOne(user);
	}

	@Post()
	@Public()
	@ApiCreatedResponse({ type: UserResponse })
	@ApiBadRequestResponse({ description: 'Email has been exits' })
	@ApiOperation({ description: 'create new user' })
	async create(@Body() user: SignUp): Promise<UserResponse> {
		const isExits = await this.userService.getByEmail(user.email);
		if (isExits) throw new BadRequestException('Email has been exits!');
		const newUser = await this.userService.newUser(user);
		return this.userTool.removeForOne(newUser);
	}

	@Put()
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ description: 'Edit user profile' })
	@ApiOkResponse({ description: 'Edit successfully!' })
	async editProfile() {}

	@Delete()
	@ApiBearerAuth()
	@UseGuards(JwtAuthGuard)
	@ApiOperation({ description: 'Delete account' })
	@ApiOkResponse({ description: 'Delete successfully!' })
	async deleteUser() {}

	@Get('list')
	@ApiOperation({ description: 'Find all user' })
	@ApiBearerAuth()
	@ApiOkResponse({ type: UsersResponse })
	@ApiNotFoundResponse({ description: 'No user in DB !' })
	@UseGuards(JwtAuthGuard)
	@Roles(Role.Admin)
	async findAll(): Promise<UsersResponse> {
		const users = await this.userService.getAll();
		if (users.length === 0) throw new NotFoundException('No user in DB !');
		return this.userTool.removeForMany(users);
	}

	@Post('signin')
	@Public()
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
	@ApiBearerAuth()
	@ApiOperation({ description: 'Get user by email' })
	@ApiOkResponse({ type: UserResponse })
	@ApiNotFoundResponse({ type: Error, description: 'Not found user' })
	async getUserByEmail(@Query('email') email: string): Promise<UserResponse> {
		const user = await this.userService.getByEmail(email);
		if (!user) throw new NotFoundException('Not found user !');
		return this.userTool.removeForOne(user);
	}

	@Put('password')
	@ApiBearerAuth()
	@ApiOperation({ description: 'changer password ' })
	@ApiOkResponse({ description: 'Changer successfully' })
	@ApiBadRequestResponse({ description: 'Check your new password or repeat password!' })
	@ApiUnauthorizedResponse({ description: 'password wrong' })
	async changerPassword(@Body() body: ChangerPassword, @User() payload: JwtPayload): Promise<string> {
		const user = await this.userService.getByID(payload.userId);
		if (!user || !this.bcrypt.compare(body.password, user.password)) throw new UnauthorizedException('User not found ');
		if (body.newPassword.length < 4 || body.repeatPassword !== body.newPassword)
			throw new BadRequestException('Check your new password and repeat password !');
		const newPassword = await this.bcrypt.hash(body.newPassword);
		await this.userService.editPassword(user._id.toString(), newPassword);
		return 'Changer password successfully!';
	}

	@Get('forgot-password')
	@Public()
	@ApiOperation({ description: 'Send mail to reset password' })
	@ApiBadRequestResponse({ description: 'Email wrong ' })
	@ApiOkResponse({ description: 'Check your email!' })
	async sendMailForgotPassword(@Body() email: string): Promise<string> {
		const user = await this.userService.getByEmail(email);
		if (!user) throw new BadRequestException('Email wrong!');
		return 'test';
	}

	@Post('forgot-password')
	@Public()
	@ApiOperation({ description: 'Set new password ' })
	@ApiOkResponse({ description: 'Set new password successfully!' })
	async forgotPassword(token: string): Promise<string> {
		return 'test	';
	}
}
