import { MenuUsecasesProxyModule } from '@infrastructure/usecases-proxy/menu-usecases-proxy.module';
import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller.module';
import { MainController } from './main.controller.module';
import { AuthUsecasesProxyModule } from '@infrastructure/usecases-proxy/auth-usecase-proxy.module';
import { AuthController } from './auth.controller.module';
import { GuardUsecasesProxyModule } from '@infrastructure/usecases-proxy/guard-usecase-proxy.module';
import { RestaurantUsecasesProxyModule } from '@infrastructure/usecases-proxy/restaurant-usecase-proxy.module';
import { RestaurantController } from './restaurant.controller.module';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    NestjsFormDataModule,
    MenuUsecasesProxyModule.register(),
    AuthUsecasesProxyModule.register(),
    GuardUsecasesProxyModule.register(),
    RestaurantUsecasesProxyModule.register(),
  ],
  controllers: [
    MenuController,
    MainController,
    AuthController,
    RestaurantController,
  ],
})
export class ControllersModule {}
