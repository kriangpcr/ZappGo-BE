import { Injectable } from '@nestjs/common';
import { UseCase } from '@usecases/use-case';
import {
  ImageRepository,
  RestaurantRepository,
} from '@domain/repositories/database';
import { Image, Restaurant, RestaurantStatus } from '@domain/model';
import { CreateRestaurantDto } from '@infrastructure/dtos/restaurant/create-restaurant.dto';
import type { IUUIDService } from '@domain/adapters/uuid.interface';
import { IStorageService } from '@domain/adapters/storage.abstract';
import { SupabaseService } from '@infrastructure/services/supabase/supabase.service';
import { PrismaService } from '@infrastructure/repositories/database/prisma/prisma.service';
import type { IPrismaService } from '@domain/repositories/database/prisma/prisma.interface';

@Injectable()
export class CreateRestaurantUseCase implements UseCase<
  {
    body: CreateRestaurantDto;
  },
  any
> {
  constructor(
    private readonly storageService: IStorageService,
    private readonly uuidService: IUUIDService,
    private readonly restaurantRepository: RestaurantRepository,
    private readonly imageRepository: ImageRepository,
    private readonly prismaService: IPrismaService,
  ) {}

  async execute(ctx: { body: CreateRestaurantDto }): Promise<any> {
    const fileName = `${this.uuidService.generate_uuidv4()}`;
    const extension = ctx.body.img.mimetype.split('/')[1] ?? 'jpg';
    const filePath = `restaurant/${fileName}.${extension}`;

    await this.storageService.putObject(
      'restaurant',
      filePath,
      ctx.body.img.buffer,
      {
        contentType: ctx.body.img.mimetype,
      },
    );

    try {
      const publicUrl = await this.storageService.getPublicUrl(
        'restaurant',
        filePath,
      );

      const restaurant = await this.prismaService.$transaction(async (tx) => {
        const image = await this.imageRepository.create(
          Image.create({
            file_name: fileName,
            bucket: 'restaurant',
            mime_type: ctx.body.img.mimetype,
            size: ctx.body.img.size,
            path: filePath,
            public_url: publicUrl,
          }),
          tx,
        );

        const openTime = new Date(`1970-01-01T${ctx.body.open_time}Z`);
        const closeTime = new Date(`1970-01-01T${ctx.body.close_time}Z`);

        const restaurant = await this.restaurantRepository.create(
          Restaurant.create({
            name: ctx.body.name,
            description: ctx.body.description,
            open_time: openTime,
            close_time: closeTime,
            image_id: image.id,
            status: RestaurantStatus.CLOSED,
          }),
          tx,
        );

        return restaurant;
      });

      return restaurant;
    } catch (error) {
      await this.storageService.removeObject('restaurant', filePath);
      throw error;
    }
  }
}
