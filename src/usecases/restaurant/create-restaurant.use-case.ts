import { Injectable } from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
import { RestaurantRepository } from '@domain/repositories/database';
import { Restaurant, RestaurantStatus } from '@domain/model';
import { CreateRestaurantDto } from '@infrastructure/dtos/restaurant/create-restaurant.dto';
import { IUUIDService } from '@domain/adapters/uuid.interface';
import { UUIDService } from '@infrastructure/services/uuid/uuid.service';

@Injectable()
export class CreateRestaurantUseCase implements UseCase<
  {
    body: CreateRestaurantDto;
  },
  any
> {
  constructor(
    private readonly restaurantRepository: RestaurantRepository,
    private readonly uuidService: IUUIDService,
  ) {}

  async execute(ctx: { body: CreateRestaurantDto }): Promise<any> {
    const file_name = this.uuidService.generate_uuidv4();
    const file_path = `restaurant/${ctx.body.name}/${file_name}.jpg`;

    const openTime = new Date(`1970-01-01T${ctx.body.open_time}Z`);
    const closeTime = new Date(`1970-01-01T${ctx.body.close_time}Z`);
    const restaurant = await this.restaurantRepository.create(
      Restaurant.create({
        name: ctx.body.name,
        description: ctx.body.description,
        open_time: openTime,
        close_time: closeTime,
        image_id: '',
        status: RestaurantStatus.CLOSED,
      }),
    );
    return restaurant;
  }
}
