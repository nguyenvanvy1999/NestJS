import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../user/user.schema';
export type DeviceDocument = Device & Document;

@Schema()
export class Device {
  @Prop({ required: true })
  _id: Types.ObjectId;

  @Prop({ required: true, trim: true })
  deviceName: string;

  @Prop({ required: true, trim: true, unique: true })
  deviceID: string;

  @Prop({ required: true, trim: true, unique: true })
  deviceType: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  user: User;
}

export const DeviceSchema = SchemaFactory.createForClass(Device);
