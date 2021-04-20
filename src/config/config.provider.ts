import * as joi from 'joi';

export const configProvider = {
	cache: true,
	isGlobal: true,
	envFilePath: '.env',
	validationSchema: joi
		.object({
			// set env and config
			DEBUG: joi.boolean().default(false),
			TEST: joi.boolean().default(false),
			SEND_MAIL: joi.boolean().default(false),
			NODE_ENV: joi.string().valid('dev', 'prod').default('dev'),
			// url and port
			PORT: joi.number().default(8080),
			URL: joi
				.string()
				.uri({ scheme: [/https?/] })
				.default('https://localhost'),
			// database
			MONGO_URI: joi
				.string()
				.regex(/^mongodb/)
				.default('mongodb://localhost:27017/Project2'),
			// send mail
			SMTP_USER: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['vn', 'com', 'net'] } }),
			SMTP_PASSWORD: joi.string(),
			SENDGRID_API_KEY: joi.string(),
			// bcrypt salt
			SALT: joi.number().min(4).max(15).default(10),
			// jwt config
			SECRET: joi.string().min(5).required(),
		})
		.or('SMTP_USER', 'SENDGRID_API_KEY')
		.and('SMTP_USER', 'SMTP_PASSWORD')
		.unknown(false),
};
