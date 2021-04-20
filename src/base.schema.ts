import { Prop, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema({ timestamps: true, versionKey: false })
export class Base extends Document {
	@ApiProperty({ type: String })
	@Prop({ type: Types.ObjectId, required: true })
	_id: Types.ObjectId;

	@ApiProperty({ type: String, format: 'date-time' })
	createdAt?: Date;

	@ApiProperty({ type: String, format: 'date-time' })
	updatedAt?: Date;

	@ApiProperty({ type: String, format: 'date-time' })
	deletedAt?: Date;
}
