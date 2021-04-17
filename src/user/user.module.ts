import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User, UserDocument } from './user.schema';
import * as bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AppConfigService } from '../config/config.service';
import { AppConfigModule } from '../config/config.module';
import { ConfigService } from '@nestjs/config';
import { UserTool } from './tools/user.tool';

@Module({
	imports: [
		AppConfigModule,
		MongooseModule.forFeatureAsync([
			{
				name: User.name,
				useFactory: (configService: ConfigService) => {
					const schema = UserSchema;
					schema.pre('save', async function (this: UserDocument, next): Promise<void> {
						this.password = await bcrypt.hash(this.password, configService.get<number>('SALT'));
						next();
					});

					schema.pre('remove', async function (this: UserDocument, next): Promise<void> {
						this.model('Data').deleteMany({ user: this._id });
						next();
					});

					schema.methods.comparePassword = function (this: UserDocument, password: string): boolean {
						if (bcrypt.compareSync(password, this.password)) return true;
						return false;
					};

					schema.methods.getFullName = function getFullName(this: UserDocument): string {
						return this.firstName + ' ' + this.lastName;
					};
					return schema;
				},
				inject: [ConfigService],
			},
		]),
	],
	controllers: [UserController],
	providers: [UserService, AppConfigService, UserTool],
})
export class UserModule {}
