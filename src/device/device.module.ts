import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Device, DeviceDocument, DeviceSchema } from './device.schema';
import { AppConfigService } from '../config/config.service';
import { UserSchema } from '../user/user.schema';
import { model } from 'mongoose';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
@Module({
	imports: [
		MongooseModule.forFeatureAsync([
			{
				name: Device.name,
				useFactory: (configService: AppConfigService) => {
					const schema = DeviceSchema;
					const User = model('User', UserSchema);
					schema.methods.getUserInfo = async function (this: DeviceDocument) {
						const user = await User.findById(this.user);
						return { ...user, password: undefined };
					};
					return schema;
				},
			},
		]),
	],
	controllers: [DeviceController],
	providers: [DeviceService],
})
export class DeviceModule {}
