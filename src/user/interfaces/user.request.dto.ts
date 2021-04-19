import { OmitType, ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../user.schema';

export class SignIn extends PickType(User, ['email', 'password']) {}

export class SignUp extends OmitType(User, ['_id', 'isActive', 'createdAt', 'deletedAt', 'updatedAt']) {}
