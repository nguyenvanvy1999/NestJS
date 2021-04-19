import { UserResponse } from '../interfaces/user.response.dto';
import { User, UserDocument } from '../user.schema';

export class UserTool {
	removeForOne(user: User): UserResponse {
		const _ = user.toJSON();
		const { isActive, password, createdAt, updatedAt, deletedAt, ...result } = _;
		return result;
	}
	removeForMany(users: User[]): UserResponse[] {
		const results = [];
		users.forEach((user) => {
			const _ = user.toJSON();
			const { isActive, password, createdAt, updatedAt, deletedAt, ...tmp } = _;
			results.push(tmp);
		});
		return results;
	}
}
