import { OmitType } from '@nestjs/swagger';
import { UserInterface } from '../interfaces/user.interface';

export class UserResponse extends OmitType(UserInterface, [
	'isActive',
	'password',
	'createdAt',
	'updatedAt',
	'deletedAt',
]) {}
