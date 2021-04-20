import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
export class BcryptTool {
	constructor(private readonly config: ConfigService) {}

	public async hash(password: string): Promise<string> {
		return await bcrypt.hash(password, this.config.get<number>('SALT'));
	}

	public async compare(password: string, hash: string): Promise<boolean> {
		return await bcrypt.compare(password, hash);
	}

	public compareSync(password: string, hash: string): boolean {
		return bcrypt.compareSync(password, hash);
	}
}
