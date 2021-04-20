import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsEmail,
	IsString,
	MinLength,
	MaxLength,
	Matches,
	IsEnum,
	IsBoolean,
	IsArray,
	IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../dtos/gender.enum';

export class UserInterface {
	@ApiProperty({ type: String })
	_id: Types.ObjectId;

	@ApiProperty({ type: String, format: 'date-time' })
	@IsDateString()
	createdAt?: Date;

	@ApiProperty({ type: String, format: 'date-time' })
	@IsDateString()
	updatedAt?: Date;

	@ApiProperty({ type: String, format: 'date-time' })
	@IsDateString()
	deletedAt?: Date;

	@ApiProperty({ required: true, type: String, uniqueItems: true })
	@IsEmail()
	email: string;

	@ApiProperty({ required: true, minLength: 8 })
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
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

	@ApiProperty({ default: false })
	@IsBoolean()
	isActive: boolean;

	@ApiProperty()
	@IsArray()
	@Type(() => String)
	info: string[];
}
