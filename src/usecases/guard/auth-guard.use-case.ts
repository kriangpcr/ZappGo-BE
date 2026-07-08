import { FastifyRequest } from 'fastify';
import { EnvironmentConfigService } from '@infrastructure/config/environment-config.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { UserRepository } from '@domain/repositories/database';
import { SupabaseService } from '@infrastructure/services/supabase/supabase.service';

@Injectable()
export class AuthGuardUseCase implements UseCase<
  {
    request: FastifyRequest;
  },
  any
> {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(ctx: { request: FastifyRequest }): Promise<any> {
    const authHeader = ctx.request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(
        'This endpoint requires a bearer token in the Authorization header',
      );
    }
    const token = authHeader.split(' ')[1];
    const { data, error } = await this.supabase.getClient().auth.getUser(token);
    if (error) {
      throw new UnauthorizedException(
        'Invalid JWT: unable to parse token or verify signature',
      );
    }
    const user = await this.userRepository.getByEmail(data.user.email);
    ctx.request['user'] = user;
    return true;
  }
}
