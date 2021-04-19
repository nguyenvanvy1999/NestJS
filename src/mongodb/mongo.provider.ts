import { mongoOption } from './mongo.constant';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const mongoProvider = {
	imports: [ConfigModule],
	useFactory: (configService: ConfigService) => ({
		uri: configService.get<string>('MONGO_URI'),
		...mongoOption,
	}),
	inject: [ConfigService],
};
