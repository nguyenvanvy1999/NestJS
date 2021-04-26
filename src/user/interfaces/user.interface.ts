import { Types } from 'mongoose';
import { Gender } from '../dtos/gender.enum';
import { Role } from '../dtos/role.enum';

export interface UserInterface {
	_id: Types.ObjectId;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	gender: Gender;
	isActive: boolean;
	info?: string[];
	roles: Role[];
}
