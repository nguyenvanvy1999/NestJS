import { Types } from 'mongoose';
import { Gender } from './gender.enum';

export class UserResponse {
	_id: Types.ObjectId;
	email: string;
	firstName: string;
	lastName: string;
	gender: Gender;
	info?: string[];
}
