import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
	helloWorld(): string {
		return 'Hello World!';
	}
}
