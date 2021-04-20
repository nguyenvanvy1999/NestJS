import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './user-return.dto';

export class UsersResponse {
	@ApiProperty({ type: [UserResponse] })
	users: UserResponse[];

	@ApiProperty()
	count: number;
}
