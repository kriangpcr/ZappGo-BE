import { MenuUsecasesProxyModule } from '@infrastructure/usecases-proxy/menu-usecases-proxy.module';
import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller.module';
import { MainController } from './main.controller.module';
import { AuthUsecasesProxyModule } from '@infrastructure/usecases-proxy/auth-usecase-proxy.module';
import { AuthController } from './auth.controller.module';
import { GuardUsecasesProxyModule } from '@infrastructure/usecases-proxy/guard-usecase-proxy.module';
@Module({
  imports: [
    MenuUsecasesProxyModule.register(),
    AuthUsecasesProxyModule.register(),
    GuardUsecasesProxyModule.register(),
  ],
  controllers: [MenuController, MainController, AuthController],
})
export class ControllersModule {}
