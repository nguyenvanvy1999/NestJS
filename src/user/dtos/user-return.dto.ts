import { OmitType, ApiProperty } from '@nestjs/swagger';
import { User } from '../user.schema';
import { UserInterface } from '../interfaces/user.interface';

export class UserResponse extends OmitType(UserInterface, [
	'isActive',
	'password',
	'createdAt',
	'updatedAt',
	'deletedAt',
]) {}
