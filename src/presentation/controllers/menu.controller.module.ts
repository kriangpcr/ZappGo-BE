import { AuthGuard } from '@infrastructure/common/guards/auth.guard';
import { CreateMenuDto } from '@infrastructure/dtos/menu/create-menu.dto';
import { MenuUsecasesProxyModule } from '@infrastructure/usecases-proxy/menu-usecases-proxy.module';
import { UseCaseProxy } from '@infrastructure/usecases-proxy/usecases-proxy';
import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateMenuUseCase,
  GetMenuRestaurantUseCase,
  GetMenuUseCase,
} from '@usecases/index';

@Controller({ path: 'menu' })
@ApiTags('Menu')
export class MenuController {
  constructor(
    @Inject(MenuUsecasesProxyModule.CREATE_MENU_USECASE)
    private readonly createMenuUseCase: UseCaseProxy<CreateMenuUseCase>,
    @Inject(MenuUsecasesProxyModule.GET_MENU_USECASE)
    private readonly getMenuUseCase: UseCaseProxy<GetMenuUseCase>,
    @Inject(MenuUsecasesProxyModule.GET_MENU_RESTAURANT_USECASE)
    private readonly getMenuRestaurantUseCase: UseCaseProxy<GetMenuRestaurantUseCase>,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  async createMenu(@Body() body: CreateMenuDto) {
    const user = await this.createMenuUseCase.getUseCase().execute({ body });
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/get/:id')
  async getMenu(@Param('id') id: string) {
    const user = await this.getMenuUseCase.getUseCase().execute({ id });
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('/get/restaurant/:restaurant_id')
  async getMenuRestaurant(@Param('restaurant_id') restaurant_id: string) {
    const user = await this.getMenuRestaurantUseCase
      .getUseCase()
      .execute({ restaurant_id });
    return user;
  }
}
