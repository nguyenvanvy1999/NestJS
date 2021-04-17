import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = User & Document;
enum Gender {
	Male = 'Male',
	Female = 'Female',
	Undisclosed = 'Undisclosed',
}
@Schema({ timestamps: true, versionKey: false })
export class User {
	@ApiProperty({ type: String })
	@Prop({ type: Types.ObjectId, required: true })
	_id: Types.ObjectId;

	@ApiProperty({ type: String, uniqueItems: true })
	@Prop({ required: true, unique: true, lowercase: true, trim: true })
	email: string;

	@ApiProperty()
	@Prop({ trim: true })
	firstName: string;

	@ApiProperty()
	@Prop({ trim: true })
	lastName: string;

	@ApiProperty({ minLength: 8 })
	@Prop({ required: true, min: 8 })
	password: string;

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

	@ApiProperty({ type: [String] })
	@Prop({ type: [{ type: Types.ObjectId, ref: 'Device' }] })
	devices: Types.ObjectId[];

	@ApiProperty()
	@Prop({ type: [String] })
	info: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
