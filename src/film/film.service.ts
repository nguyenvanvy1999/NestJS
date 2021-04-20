import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmSchema, FilmDocument } from './film.schema';
import * as mongoose from 'mongoose';
import { AppConfigService } from 'src/config/config.service';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>,
		private readonly config: AppConfigService
	) {}

	async test() {
		this.filmModel.findOne({ createAt: 'test' });
		this.filmModel.findOne({ _id: 'test' });
	}
}
