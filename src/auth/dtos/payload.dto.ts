export class Payload {
	_id: string;
}

export class JwtPayload {
	_id: string;
	iat?: number;
	exp?: number;
	jti?: string;
}
