import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Base } from 'src/base.schema';

export type UserDocument = User & Document;
enum Gender {
	Male = 'Male',
	Female = 'Female',
	Undisclosed = 'Undisclosed',
}
@Schema({ timestamps: true, versionKey: false })
export class User extends Base {
	@ApiProperty({ type: String, uniqueItems: true })
	@Prop({ required: true, unique: true, lowercase: true, trim: true })
	email: string;

	@ApiProperty({ minLength: 8 })
	@Prop({ required: true, min: 8 })
	password: string;

	@ApiProperty()
	@Prop({ trim: true })
	firstName: string;

	@ApiProperty()
	@Prop({ trim: true })
	lastName: string;

	@ApiProperty({ enum: Gender, default: Gender.Undisclosed })
	@Prop({
		type: String,
		enum: Object.values(Gender),
		default: Gender.Undisclosed,
	})
	gender: Gender;

	@ApiProperty({ default: false })
	@Prop({ required: true, default: false })
	isActive: boolean;

	@ApiProperty()
	@Prop({ type: [String] })
	info: string[];

	comparePassword: (password: string) => boolean;

	getFullName: () => string;
}

export const UserSchema = SchemaFactory.createForClass(User);
