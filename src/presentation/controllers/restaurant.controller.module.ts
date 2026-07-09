import { AuthGuard } from '@infrastructure/common/guards/auth.guard';
import { CreateRestaurantDto } from '@infrastructure/dtos/restaurant/create-restaurant.dto';
import { RestaurantUsecasesProxyModule } from '@infrastructure/usecases-proxy/restaurant-usecase-proxy.module';
import { UseCaseProxy } from '@infrastructure/usecases-proxy/usecases-proxy';
import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateRestaurantUseCase } from '@usecases/index';
import { FormDataRequest } from 'nestjs-form-data';

@Controller({ path: 'restaurant' })
@ApiTags('Restaurant')
export class RestaurantController {
  constructor(
    @Inject(RestaurantUsecasesProxyModule.CREATE_RESTAURANT_USECASE)
    private readonly createRestaurantUseCase: UseCaseProxy<CreateRestaurantUseCase>,
  ) {}

  @UseGuards(AuthGuard)
  @Post('/create')
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateRestaurantDto })
  @FormDataRequest()
  async createRestaurant(@Body() body: CreateRestaurantDto) {
    const user = await this.createRestaurantUseCase
      .getUseCase()
      .execute({ body });
    return user;
  }
}
