import { DatabaseModule } from '@infrastructure/repositories/database/database.module';
import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from './usecases-proxy';
import { AuthGuardUseCase } from '@usecases/guard/auth-guard.use-case';
import { SupabaseService } from '@infrastructure/services/supabase/supabase.service';
import { SupabaseModule } from '@infrastructure/services/supabase/supabase.module';
import { UserRepository } from '@domain/repositories/database';

@Module({
  imports: [DatabaseModule, SupabaseModule],
})
export class GuardUsecasesProxyModule {
  static AUTH_GUARD_USECASE = 'AuthGuardUseCase';

  static register(): DynamicModule {
    return {
      module: GuardUsecasesProxyModule,
      providers: [
        {
          inject: [SupabaseService, UserRepository],
          provide: GuardUsecasesProxyModule.AUTH_GUARD_USECASE,
          useFactory: (
            supabaseService: SupabaseService,
            userRepository: UserRepository,
          ) =>
            new UseCaseProxy(
              new AuthGuardUseCase(supabaseService, userRepository),
            ),
        },
      ],
      exports: [GuardUsecasesProxyModule.AUTH_GUARD_USECASE],
    };
  }
}
