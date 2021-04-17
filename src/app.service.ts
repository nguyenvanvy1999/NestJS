import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class AppService {
	helloWorld(): string {
		return 'Hello World!';
	}
}
