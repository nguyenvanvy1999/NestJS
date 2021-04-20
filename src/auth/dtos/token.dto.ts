import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TokenResponse {
	@ApiProperty() accessToken: string;
	@ApiProperty({ default: 'bearer' }) tokenType: string = 'bearer';
	@ApiProperty() expiresIn: number;
	@ApiPropertyOptional() refreshToken?: string;
}
