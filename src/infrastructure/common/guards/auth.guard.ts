import { FastifyRequest } from 'fastify';
import { UseCaseProxy } from '@infrastructure/usecases-proxy/usecases-proxy';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuardUseCase } from '@usecases/guard/auth-guard.use-case';
import { GuardUsecasesProxyModule } from '@infrastructure/usecases-proxy/guard-usecase-proxy.module';
@Injectable()
export class AuthGuard implements CanActivate {
  @Inject(GuardUsecasesProxyModule.AUTH_GUARD_USECASE)
  private readonly authUseCase: UseCaseProxy<AuthGuardUseCase>;
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(
        'This endpoint requires a bearer token in the Authorization header',
      );
    }
    const check_supabase = await this.authUseCase
      .getUseCase()
      .execute({ request });
    if (check_supabase) return true;
    throw new UnauthorizedException(
      'Invalid JWT: unable to parse token or verify signature',
    );
  }
}
