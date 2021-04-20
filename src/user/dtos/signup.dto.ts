import { OmitType } from '@nestjs/swagger';
import { UserInterface } from '../interfaces/user.interface';
export class SignUp extends OmitType(UserInterface, ['_id', 'isActive', 'createdAt', 'deletedAt', 'updatedAt']) {}
