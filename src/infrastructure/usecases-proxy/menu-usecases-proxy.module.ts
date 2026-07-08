import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from './usecases-proxy';
import { DatabaseModule } from '@infrastructure/repositories/database/database.module';
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config.module';
import { CreateMenuUseCase, GetMenuRestaurantUseCase } from '@usecases/index';
import {
  MenuRepository,
  RestaurantRepository,
} from '@domain/repositories/database';
import { GetMenuUseCase } from '@usecases/menu/get-menu-id.use-case';

@Module({
  imports: [DatabaseModule, EnvironmentConfigModule],
})
export class MenuUsecasesProxyModule {
  static CREATE_MENU_USECASE = 'CreateMenuUsecase';
  static GET_MENU_USECASE = 'GetMenuUseCase';
  static GET_MENU_RESTAURANT_USECASE = 'GetMenuRestaurantUseCase';

  static register(): DynamicModule {
    return {
      module: MenuUsecasesProxyModule,
      providers: [
        {
          inject: [MenuRepository, RestaurantRepository],
          provide: MenuUsecasesProxyModule.CREATE_MENU_USECASE,
          useFactory: (
            menuRepository: MenuRepository,
            restaurantRepository: RestaurantRepository,
          ) =>
            new UseCaseProxy(
              new CreateMenuUseCase(menuRepository, restaurantRepository),
            ),
        },
        {
          inject: [MenuRepository],
          provide: MenuUsecasesProxyModule.GET_MENU_USECASE,
          useFactory: (menuRepository: MenuRepository) =>
            new UseCaseProxy(new GetMenuUseCase(menuRepository)),
        },
        {
          inject: [MenuRepository, RestaurantRepository],
          provide: MenuUsecasesProxyModule.GET_MENU_RESTAURANT_USECASE,
          useFactory: (
            menuRepository: MenuRepository,
            restaurantRepository: RestaurantRepository,
          ) =>
            new UseCaseProxy(
              new GetMenuRestaurantUseCase(
                menuRepository,
                restaurantRepository,
              ),
            ),
        },
      ],
      exports: [
        MenuUsecasesProxyModule.CREATE_MENU_USECASE,
        MenuUsecasesProxyModule.GET_MENU_USECASE,
        MenuUsecasesProxyModule.GET_MENU_RESTAURANT_USECASE,
      ],
    };
  }
}
