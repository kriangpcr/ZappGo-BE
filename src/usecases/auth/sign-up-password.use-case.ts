import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
import { UserRepository } from '@domain/repositories/database';
import { SignUpDto } from '@infrastructure/dtos/auth/signup.dto';
import { User } from '@domain/model';
import { SupabaseService } from '@infrastructure/services/supabase/supabase.service';
@Injectable()
export class SignUpPasswordUseCase implements UseCase<
  {
    body: SignUpDto;
  },
  any
> {
  constructor(
    private readonly supabase: SupabaseService,
    private readonly userRepository: UserRepository,
  ) {}

  async execute(ctx: { body: SignUpDto }): Promise<any> {
    const { data, error } = await this.supabase.getClient().auth.signUp({
      email: ctx.body.email,
      password: ctx.body.password,
    });
    if (error) {
      throw new BadRequestException(error.message);
    }
    if (!data.user) {
      throw new BadRequestException('Unable to create user');
    }
    const userExists = await this.userRepository.getByEmail(data.user.email);
    if (userExists) {
      throw new BadRequestException('Email already registered');
    }
    const user = User.create({
      id: data.user.id,
      email: data.user.email,
    });

    await this.userRepository.create(user);
    return data.user;
  }
}
