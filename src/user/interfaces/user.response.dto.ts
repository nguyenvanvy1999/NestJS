import { OmitType, ApiProperty } from '@nestjs/swagger';
import { User } from '../user.schema';

export class UserResponse extends OmitType(User, [
	'isActive',
	'password',
	'createAt',
	'updateAt',
	'devices',
] as undefined) {}

export class UsersResponse {
	@ApiProperty({ type: [UserResponse] })
	users: UserResponse[];

	@ApiProperty()
	count: number;
}

export class TokenResponse {
	@ApiProperty()
	access: string;

	@ApiProperty()
	refresh: string;
}

export class Error {
	@ApiProperty({ minimum: 100, maximum: 504 })
	statusCode: number;

	@ApiProperty()
	message: string;

	@ApiProperty()
	error: string;
}
