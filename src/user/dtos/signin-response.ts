import { ApiProperty } from '@nestjs/swagger';
export class SignInReturn {
	@ApiProperty() accessToken: string;
	@ApiProperty({ required: false }) refreshToken?: string;
}
