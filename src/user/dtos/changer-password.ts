import { ApiProperty } from '@nestjs/swagger';
export class ChangerPassword {
	@ApiProperty() password: string;
	@ApiProperty({ minLength: 4, maxLength: 20 }) newPassword: string;
	@ApiProperty() repeatPassword: string;
}
