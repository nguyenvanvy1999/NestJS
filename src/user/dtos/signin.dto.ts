import { PickType } from '@nestjs/swagger';
import { UserInterface } from '../interfaces/user.interface';
export class SignIn extends PickType(UserInterface, ['email', 'password']) {}
