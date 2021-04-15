import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}
	async getAll(): Promise<User[]> {
		return await this.userModel.find({});
	}
	async newUser(): Promise<User> {
		const user = new this.userModel({
			email: 'test',
		});
		return await user.save();
	}
	async getUserByEmail(email: string): Promise<User> {
		return await this.userModel.findOne({ email });
	}
	async getUserByID(_id: string): Promise<User> {
		return await this.userModel.findById(_id);
	}
}
