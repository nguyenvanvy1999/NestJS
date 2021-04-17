import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
export type DeviceDocument = Device & Document;
import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

@Schema({ timestamps: true, versionKey: false })
export class Device {
	@ApiProperty({ type: String })
	@Prop({ required: true })
	_id: Types.ObjectId;

	@ApiProperty()
	@Prop({ required: true, trim: true })
	deviceName: string;

	@ApiProperty({ type: String, uniqueItems: true })
	@Prop({ required: true, trim: true, unique: true })
	deviceID: string;

	@ApiProperty()
	@Prop({ required: true, trim: true })
	deviceType: string;

	@ApiProperty()
	@Prop({ required: true, trim: true })
	deviceModel: string;

	@Prop()
	@ApiProperty({ type: [String] })
	deviceInfo: string[];

	@ApiProperty({ type: String })
	@Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
	user: Types.ObjectId;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
