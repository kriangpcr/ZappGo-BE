import { EnvironmentConfigModule } from '@infrastructure/config/environment-config.module';
import { MenuUsecasesProxyModule } from '@infrastructure/usecases-proxy/menu-usecases-proxy.module';
import { UserUsecasesProxyModule } from '@infrastructure/usecases-proxy/user-usecases-proxy.module';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller.module';
import { MenuController } from './menu.controller.module';
import { MainController } from './main.controller.module';
@Module({
  imports: [
    UserUsecasesProxyModule.register(),
    MenuUsecasesProxyModule.register(),
  ],
  controllers: [UserController, MenuController, MainController],
})
export class ControllersModule {}
