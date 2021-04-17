import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import * as mongoose from 'mongoose';
import { SignUp } from './interfaces/user.request.dto';
@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

	async getAll(): Promise<User[]> {
		return await this.userModel.find({});
	}

	async newUser(user: SignUp): Promise<User> {
		const newUser = new this.userModel({
			_id: mongoose.Types.ObjectId(),
			...user,
		});
		return await newUser.save();
	}

	async getByEmail(email: string): Promise<User> {
		return await this.userModel.findOne({ email });
	}

	async getByID(_id: string): Promise<User> {
		return await this.userModel.findById(_id);
	}
}
