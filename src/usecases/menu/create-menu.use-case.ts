import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
import {
  MenuRepository,
  RestaurantRepository,
} from '@domain/repositories/database';
import { CreateMenuDto } from '@infrastructure/dtos/menu/create-menu.dto';
import { Menu, MenuStatus } from '@domain/model';
@Injectable()
export class CreateMenuUseCase implements UseCase<
  {
    body: CreateMenuDto;
  },
  any
> {
  constructor(
    private readonly menuRepository: MenuRepository,
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async execute(ctx: { body: CreateMenuDto }): Promise<any> {
    const Restaurant = await this.restaurantRepository.getById(
      ctx.body.restaurant_id,
    );
    if (!Restaurant) {
      return new BadRequestException('Restaurant not found');
    }

    const menu = await this.menuRepository.create(
      Menu.create({
        name: ctx.body.name,
        price: Number(ctx.body.price),
        restaurant_id: ctx.body.restaurant_id,
        status: ctx.body.status as unknown as MenuStatus,
      }),
    );
    return menu;
  }
}
