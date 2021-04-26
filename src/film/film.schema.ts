import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Base } from 'src/share/base.schema';
import { Types } from 'mongoose';

export type FilmDocument = Film & Document;

@Schema({ timestamps: true, versionKey: false })
export class Film extends Base {
	@Prop({ type: String, required: true })
	name: string;

	@Prop({ type: String })
	url: string;

	@Prop()
	category: string;

	@Prop({ default: Date.now() })
	year: Date;

	@Prop({ type: Number, default: 5, min: 1, max: 5 })
	rate: number;

	@Prop({
		type: Number,
		default: 0,
		validate: { validator: Number.isInteger },
		min: 0,
	})
	likes: number;

	@Prop({
		type: Number,
		default: 0,
		validate: { validator: Number.isInteger },
		min: 0,
	})
	views: number;

	@Prop({ type: Types.ObjectId, ref: 'User', required: true })
	addBy: Types.ObjectId;
}

export const FilmSchema = SchemaFactory.createForClass(Film);
