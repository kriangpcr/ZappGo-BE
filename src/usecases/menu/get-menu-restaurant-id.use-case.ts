import { BadRequestException, Injectable } from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
import {
  MenuRepository,
  RestaurantRepository,
} from '@domain/repositories/database';
@Injectable()
export class GetMenuRestaurantUseCase implements UseCase<
  {
    restaurant_id: string;
  },
  any
> {
  constructor(
    private readonly menuRepository: MenuRepository,
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async execute(ctx: { restaurant_id: string }): Promise<any> {
    const restaurant = await this.restaurantRepository.getById(
      ctx.restaurant_id,
    );
    if (!restaurant) {
      throw new BadRequestException('Restaurant not found');
    }
    const menu = await this.menuRepository.getByRestaurantId(ctx.restaurant_id);
    if (!menu) {
      return null;
    }
    return menu;
  }
}
