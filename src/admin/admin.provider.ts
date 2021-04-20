import { Admin, AdminSchema, AdminDocument } from './admin.schema';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

export const adminProvider = {
	name: Admin.name,
	useFactory: (config: ConfigService) => {
		const schema = AdminSchema;
		schema.pre('save', async function (this: AdminDocument, next): Promise<void> {
			this.password = await bcrypt.hash(this.password, config.get<number>('SALT'));
			next();
		});
		schema.methods.comparePassword = function (this: AdminDocument, password: string): boolean {
			return bcrypt.compareSync(password, this.password);
		};
		return schema;
	},
};
