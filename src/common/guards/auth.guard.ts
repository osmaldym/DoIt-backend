import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { catch_unwind } from "rusting-js";
import { jwtConstants } from "src/config/constants";
import { Guard } from "src/config/enums/guard.enum";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) {}

    private throwUnauthorized(): UnauthorizedException {
        throw new UnauthorizedException("Unauthorized");
    }
    
    private extractTokenFromHeader(req: Request): string | undefined {
        const [type, token] = req.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(Guard.GUARD_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if (isPublic) return true;

        const req = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(req);
        if (!token) this.throwUnauthorized();

        const res = await catch_unwind(async () => {
            const payload = await this.jwtService.verifyAsync(token, { 
                secret: jwtConstants.secret
            })
    
            req['user'] = payload;
        })

        if (res.is_err()) this.throwUnauthorized();
        return true;
    }
}