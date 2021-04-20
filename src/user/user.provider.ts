import { UserSchema, User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

export const userProvider = {
	name: User.name,
	useFactory: (config: ConfigService) => {
		const schema = UserSchema;
		schema.pre('save', async function (this: UserDocument, next): Promise<void> {
			this.password = await bcrypt.hash(this.password, config.get<number>('SALT'));
			next();
		});
		schema.methods.comparePassword = function (this: UserDocument, password: string): boolean {
			return bcrypt.compareSync(password, this.password);
		};
		schema.methods.getFullName = function getFullName(this: UserDocument): string {
			return this.firstName + ' ' + this.lastName;
		};
		return schema;
	},
	inject: [ConfigService],
};
