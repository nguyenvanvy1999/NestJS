import { Injectable, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/user/dtos/role.enum';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
	constructor(private readonly reflector: Reflector) {
		super();
	}

	handleRequest(err: Error, user: any, info: Error, context: ExecutionContext): any {
		const roles = this.reflector.get<Role[]>('roles', context.getHandler());
		if (!roles) {
			return true;
		}
		const hasRole = () => user.roles.some((role: Role) => roles.includes(role));
		if (!user) {
			throw new UnauthorizedException();
		}
		if (!(user.roles && hasRole())) {
			throw new ForbiddenException('Forbidden');
		}
		return user && user.roles && hasRole();
	}
}
