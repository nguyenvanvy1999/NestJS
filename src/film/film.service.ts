import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmSchema, FilmDocument } from './film.schema';
import * as mongoose from 'mongoose';
import { AppConfigService } from 'src/config/config.service';

@Injectable()
export class FilmService {
	constructor(
		@InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>,
		private readonly config: AppConfigService
	) {}

	async getById(_id: string): Promise<Film> {
		return await this.filmModel.findById(_id);
	}

	async getByName(name: string): Promise<Film[]> {
		return this.filmModel.find({ name: { $regex: name, $options: 'i' } });
	}

	async getAll(sort?: string, limit?: number, skip?: number) {
		return this.filmModel.aggregate([
			{ $match: {} },
			{ $sort: { _id: -1 } },
			{
				$facet: {
					metadata: [{ $count: 'total' }],
					data: [{ $skip: skip }, { $limit: limit }, { $project: {} }],
				},
			},
		]);
	}
}
