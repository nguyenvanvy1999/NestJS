import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Base } from 'src/share/base.schema';
import { Gender } from './dtos/gender.enum';
import { Role } from './dtos/role.enum';

export type UserDocument = User & Document;
@Schema({ timestamps: true, versionKey: false })
export class User extends Base {
	@Prop({ required: true, unique: true, lowercase: true, trim: true })
	email: string;

	@Prop({ required: true, min: 8 })
	password: string;

	@Prop({ trim: true })
	firstName: string;

	@Prop({ trim: true })
	lastName: string;

	@Prop({
		type: String,
		enum: Object.values(Gender),
		default: Gender.Undisclosed,
	})
	gender: Gender;

	@Prop({ required: true, default: false })
	isActive: boolean;

	@Prop({ type: [String] })
	info: string[];

	@Prop({ type: [String], enum: Object.values(Role), default: Role.User })
	roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
