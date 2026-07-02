import { Restaurant, RestaurantStatus } from '@domain/model';
import { Restaurant as PrismaRestaurant } from '@prisma/client';

export class PrismaRestaurantMapper {
  public static toPrisma(restaurant: Partial<Restaurant>): PrismaRestaurant {
    return {
      id: restaurant.id,
      name: restaurant.name,
      description: restaurant.description,
      open_time: restaurant.open_time,
      close_time: restaurant.close_time,
      status: restaurant.status,
    };
  }

  public static toDomain(restaurant: PrismaRestaurant): Restaurant {
    if (!restaurant) return null;
    return Restaurant.reconstitute({
      ...restaurant,
      status: restaurant.status as RestaurantStatus,
    });
  }
}
