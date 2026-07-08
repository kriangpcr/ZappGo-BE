import { DatabaseModule } from '@infrastructure/repositories/database/database.module';
import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from './usecases-proxy';
import { SignInPasswordUseCase, SignUpPasswordUseCase } from '@usecases/index';
import { SupabaseService } from '@infrastructure/services/supabase/supabase.service';
import { UserRepository } from '@domain/repositories/database';
import { SupabaseModule } from '@infrastructure/services/supabase/supabase.module';

@Module({
  imports: [DatabaseModule, SupabaseModule],
})
export class AuthUsecasesProxyModule {
  static SIGN_IN_PASSWORD_USECASE = 'SignInPasswordUseCase';
  static SIGN_UP_PASSWORD_USECASE = 'SignUpPasswordUseCase';

  static register(): DynamicModule {
    return {
      module: AuthUsecasesProxyModule,
      providers: [
        {
          inject: [SupabaseService, UserRepository],
          provide: AuthUsecasesProxyModule.SIGN_IN_PASSWORD_USECASE,
          useFactory: (
            supabaseService: SupabaseService,
            userRepository: UserRepository,
          ) =>
            new UseCaseProxy(
              new SignInPasswordUseCase(supabaseService, userRepository),
            ),
        },
        {
          inject: [SupabaseService, UserRepository],
          provide: AuthUsecasesProxyModule.SIGN_UP_PASSWORD_USECASE,
          useFactory: (
            supabaseService: SupabaseService,
            userRepository: UserRepository,
          ) =>
            new UseCaseProxy(
              new SignUpPasswordUseCase(supabaseService, userRepository),
            ),
        },
      ],
      exports: [
        AuthUsecasesProxyModule.SIGN_IN_PASSWORD_USECASE,
        AuthUsecasesProxyModule.SIGN_UP_PASSWORD_USECASE,
      ],
    };
  }
}
