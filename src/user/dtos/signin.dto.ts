import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';
export class SignIn {
	@ApiProperty({ type: String, required: true })
	@IsEmail()
	email: string;

	@ApiProperty({ type: String, name: 'password', minLength: 4, maxLength: 20, description: 'password to sign in' })
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	password: string;
}
