import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Device, DeviceDocument } from './device.schema';

@Injectable()
export class DeviceService {
	constructor(@InjectModel(Device.name) private readonly deviceModel: Model<DeviceDocument>) {}
	async getAllDeviceUser(user: string) {
		return await this.deviceModel.find({ user });
	}
	async getAllDeviceType(): Promise<string[]> {
		return await this.deviceModel.find().distinct('deviceType');
	}
	async getAllDeviceModel(): Promise<string[]> {
		return await this.deviceModel.find().distinct('deviceModel');
	}
}
