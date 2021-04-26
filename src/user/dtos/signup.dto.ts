import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MinLength, MaxLength, IsEnum } from 'class-validator';
import { Gender } from './gender.enum';
export class SignUp {
	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty({ required: true, minLength: 4, maxLength: 20 })
	@IsString()
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	password: string;

	@ApiProperty()
	@IsString()
	firstName: string;

	@ApiProperty()
	@IsString()
	lastName: string;

	@ApiProperty({ enum: Gender, default: Gender.Undisclosed })
	@IsEnum(Gender)
	gender: Gender;
	info: string[];
}
