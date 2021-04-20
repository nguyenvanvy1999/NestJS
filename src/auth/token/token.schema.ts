import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Base } from 'src/share/base.schema';

export type TokenDocument = Token & Document;
@Schema({ timestamps: true, versionKey: false })
export class Token extends Base {
	@Prop({ required: true, unique: true })
	value: string;

	@Prop({ type: Types.ObjectId, ref: 'User' })
	userId: Types.ObjectId;

	@Prop()
	ipAddress: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
