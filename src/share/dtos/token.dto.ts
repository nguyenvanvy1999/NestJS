import { ApiProperty } from '@nestjs/swagger';
export class TokenResponse {
	@ApiProperty()
	access: string;

	@ApiProperty()
	refresh: string;
}
