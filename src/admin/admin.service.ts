import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './admin.schema';
import { AppConfigService } from 'src/config/config.service';
@Injectable()
export class AdminService {
	constructor(
		@InjectModel(Admin.name) private readonly userModel: Model<AdminDocument>,
		private readonly config: AppConfigService
	) {}
}
