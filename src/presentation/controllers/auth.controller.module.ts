import { SignInDto } from '@infrastructure/dtos/auth/signin.dto';
import { SignUpDto } from '@infrastructure/dtos/auth/signup.dto';
import { AuthUsecasesProxyModule } from '@infrastructure/usecases-proxy/auth-usecase-proxy.module';
import { UseCaseProxy } from '@infrastructure/usecases-proxy/usecases-proxy';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SignInPasswordUseCase, SignUpPasswordUseCase } from '@usecases/index';

@Controller({ path: 'auth' })
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject(AuthUsecasesProxyModule.SIGN_IN_PASSWORD_USECASE)
    private readonly signInPasswordUseCase: UseCaseProxy<SignInPasswordUseCase>,
    @Inject(AuthUsecasesProxyModule.SIGN_UP_PASSWORD_USECASE)
    private readonly signUpPasswordUseCase: UseCaseProxy<SignUpPasswordUseCase>,
  ) {}

  @Post('/sign-up')
  async SignUp(@Body() body: SignUpDto) {
    const user = await this.signUpPasswordUseCase
      .getUseCase()
      .execute({ body });
    return user;
  }

  @Post('/sign-in')
  async SignIn(@Body() body: SignInDto) {
    const user = await this.signInPasswordUseCase
      .getUseCase()
      .execute({ body });
    return user;
  }
}
