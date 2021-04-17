import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AppConfigService {
	constructor(private configService: ConfigService) {}

	get isDebug(): boolean {
		return this.configService.get<boolean>('DEBUG'); // because before, debug and test set to boolean
	}
	get isSendMail(): boolean {
		return this.configService.get<boolean>('SEND_MAIL');
	}
	get salt(): number {
		return this.configService.get<number>('SALT');
	}
}
