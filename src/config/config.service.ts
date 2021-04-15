import * as joi from 'joi';
import { ConfigService } from '@nestjs/config';
// export interface EnvConfig {
// 	[key: string]: string;
// }
export class AppConfigService {
	constructor(private configService: ConfigService) {}
	get isAuthEnabled(): boolean {
		return this.configService.get('AUTH_ENABLED') === 'true';
	}
	// private static validateInput(envConfig: EnvConfig): EnvConfig {
	// 	const envVarsSchema: joi.ObjectSchema = joi
	// 		.object({
	// 			// set env and config
	// 			DEBUG: joi.boolean().default(false),
	// 			TEST: joi.boolean().default(false),
	// 			SEND_MAIL: joi.boolean().default(false),
	// 			NODE_ENV: joi.string().valid('dev', 'prod').default('dev'),
	// 			// url and port
	// 			PORT: joi.number().default(8080),
	// 			URL: joi
	// 				.string()
	// 				.uri({ scheme: [/https?/] })
	// 				.required(),
	// 			// database
	// 			MONGO_URI: joi
	// 				.string()
	// 				.regex(/^mongodb/)
	// 				.default('mongodb://localhost:27017/Project1'),
	// 			// send mail
	// 			SMTP_USER: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['vn', 'com', 'net'] } }),
	// 			SMTP_PASSWORD: joi.string(),
	// 			SENDGRID_API_KEY: joi.string(),
	// 			// bcrypt salt
	// 			SALT: joi.number().min(4).max(15).default(5),
	// 		})
	// 		.or('SMTP_USER', 'SENDGRID_API_KEY')
	// 		.and('SMTP_USER', 'SMTP_PASSWORD');
	// 	const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
	// 	if (error) {
	// 		throw new Error(`Config validation error: ${error.message}`);
	// 	}
	// 	return validatedEnvConfig;
	// }
	isEnv(env: string): boolean {
		return this.configService.get<string>('NODE_ENV') === env;
	}
	isDebug(): boolean {
		return this.configService.get<boolean>('DEBUG'); // because before, debug and test set to boolean
	}
	isSendMail(): boolean {
		return this.configService.get<boolean>('SEND_MAIL');
	}
}
