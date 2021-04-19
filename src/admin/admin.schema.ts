import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type AdminDocument = Admin & Document;
@Schema({ timestamps: true, versionKey: false })
export class Admin extends Document {
	@ApiProperty({ type: String })
	@Prop({ type: Types.ObjectId, required: true })
	_id: Types.ObjectId;

	@ApiProperty({ type: String, uniqueItems: true })
	@Prop({ required: true, unique: true, lowercase: true, trim: true })
	username: string;

	@ApiProperty({ minLength: 8 })
	@Prop({ required: true, min: 8 })
	password: string;

	@ApiProperty()
	@Prop({ type: [String] })
	info: string[];

	createdAt: Date;

	updatedAt: Date;

	deletedAt: Date;

	comparePassword: (password: string) => boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
