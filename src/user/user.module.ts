import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User, UserDocument } from './user.schema';
import bcrypt from 'bcrypt';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre(
            'save',
            async function (this: UserDocument, next): Promise<void> {
              this.password = await bcrypt.hash(this.password, 10);
              next();
            },
          );
          schema.pre(
            'remove',
            async function (this: UserDocument, next): Promise<void> {
              this.model('Data').deleteMany({ user: this._id });
              next();
            },
          );
          schema.methods.comparePassword = function (
            this: UserDocument,
            password: string,
          ): boolean {
            if (bcrypt.compareSync(password, this.password)) return true;
            return false;
          };
          schema.methods.getFullName = function getFullName(
            this: UserDocument,
          ): string {
            return this.firstName + ' ' + this.lastName;
          };
          schema.statics.hashPassword = function hashPassword(
            password: string,
          ): string {
            return bcrypt.hashSync(password, 10);
          };
          return schema;
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
