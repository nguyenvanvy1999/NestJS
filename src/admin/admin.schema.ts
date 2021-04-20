import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Base } from 'src/share/base.schema';

export type AdminDocument = Admin & Document;
@Schema({ timestamps: true, versionKey: false })
export class Admin extends Base {
	@ApiProperty({ type: String, uniqueItems: true })
	@Prop({ required: true, unique: true, lowercase: true, trim: true })
	username: string;

	@ApiProperty({ minLength: 8 })
	@Prop({ required: true, min: 8 })
	password: string;

	@ApiProperty()
	@Prop({ type: [String] })
	info: string[];

	comparePassword: (password: string) => boolean;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
