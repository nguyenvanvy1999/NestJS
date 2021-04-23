import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Base } from 'src/share/base.schema';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema({ timestamps: true, versionKey: false })
export class RefreshToken extends Base {
	@Prop({ type: Types.ObjectId, required: true, ref: 'User' }) userId: Types.ObjectId;
	@Prop({ required: true }) refreshToken: string;
	@Prop({ required: true }) ip: string;
	@Prop({ required: true }) browser: string;
	@Prop({ required: true }) country: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
