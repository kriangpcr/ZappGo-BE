import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
import { UserRepository } from '@domain/repositories/database';
import { SupabaseService } from '@infrastructure/services/supabase/supabase.service';
import { SignInDto } from '@infrastructure/dtos/auth/signin.dto';
@Injectable()
export class SignInPasswordUseCase implements UseCase<
  {
    body: SignInDto;
  },
  any
> {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(ctx: { body: SignInDto }): Promise<any> {
    const { data, error } = await this.supabase
      .getClient()
      .auth.signInWithPassword({
        email: ctx.body.email,
        password: ctx.body.password,
      });
    if (error) {
      throw new BadRequestException(error.message);
    }
    const user = await this.userRepository.getByEmail(ctx.body.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return { user, session: data.session };
  }
}
