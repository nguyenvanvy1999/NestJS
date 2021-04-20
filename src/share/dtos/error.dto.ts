import { ApiProperty } from '@nestjs/swagger';
export class Error {
	@ApiProperty({ minimum: 100, maximum: 504 })
	statusCode: number;

	@ApiProperty()
	message: string;

	@ApiProperty()
	error: string;
}
