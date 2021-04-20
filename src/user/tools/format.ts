import { UserResponse } from '../dtos/user-return.dto';
import { UsersResponse } from '../dtos/users-return.dto';
import { User } from '../user.schema';

export class UserTool {
	removeForOne(user: User): UserResponse {
		const _ = user.toJSON();
		const { isActive, password, createdAt, updatedAt, deletedAt, ...result } = _;
		return result;
	}
	removeForMany(users: User[]): UsersResponse {
		const results = [];
		users.forEach((user) => {
			const _ = user.toJSON();
			const { isActive, password, createdAt, updatedAt, deletedAt, ...tmp } = _;
			results.push(tmp);
		});
		return { users: results, count: results.length };
	}
}
