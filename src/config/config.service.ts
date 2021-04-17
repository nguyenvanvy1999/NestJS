import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
@Injectable()
export class AppConfigService {
	constructor(private configService: ConfigService) {}
	
	get isAuthEnabled(): boolean {
		return this.configService.get('AUTH_ENABLED') === 'true';
	}
	isEnv(env: string): boolean {
		return this.configService.get<string>('NODE_ENV') === env;
	}
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
