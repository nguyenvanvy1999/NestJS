import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

enum Gender {
  Male = 'Male',
  Female = 'Female',
  Undisclosed = 'Undisclosed',
}
@Schema()
export class User {
  @Prop({ required: true })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true, trim: true })
  firstName: string;

  @Prop({ required: true, trim: true })
  lastName: string;

  @Prop({ required: true, min: 4 })
  password: string;

  @Prop({
    type: String,
    enum: Object.values(Gender),
    default: Gender.Undisclosed,
  })
  gender: Gender;

  @Prop({ required: true, default: false })
  isActive: boolean;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Device' }] })
  device: string;

  @Prop({ type: [String] })
  info: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
