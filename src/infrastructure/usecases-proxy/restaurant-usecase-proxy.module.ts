import { DatabaseModule } from '@infrastructure/repositories/database/database.module';
import { DynamicModule, Module } from '@nestjs/common';
import { UseCaseProxy } from './usecases-proxy';
import { SupabaseModule } from '@infrastructure/services/supabase/supabase.module';
import {
  ImageRepository,
  RestaurantRepository,
} from '@domain/repositories/database';
import { StorageModule } from '@infrastructure/services/storage/storage.module';
import { UUIDModule } from '@infrastructure/services/uuid/uuid.module';
import { SupabaseStorageService } from '@infrastructure/services/storage/supabase.service';
import { UUIDService } from '@infrastructure/services/uuid/uuid.service';
import { PrismaService } from '@infrastructure/repositories/database/prisma/prisma.service';
import { CreateRestaurantUseCase } from '@usecases/index';

@Module({
  imports: [DatabaseModule, SupabaseModule, StorageModule, UUIDModule],
})
export class RestaurantUsecasesProxyModule {
  static CREATE_RESTAURANT_USECASE = 'CreateRestaurantUseCase';

  static register(): DynamicModule {
    return {
      module: RestaurantUsecasesProxyModule,
      providers: [
        {
          inject: [
            SupabaseStorageService,
            UUIDService,
            RestaurantRepository,
            ImageRepository,
            PrismaService,
          ],
          provide: RestaurantUsecasesProxyModule.CREATE_RESTAURANT_USECASE,
          useFactory: (
            supabaseService: SupabaseStorageService,
            uuidService: UUIDService,
            restaurantRepository: RestaurantRepository,
            imageRepository: ImageRepository,
            prismaService: PrismaService,
          ) =>
            new UseCaseProxy(
              new CreateRestaurantUseCase(
                supabaseService,
                uuidService,
                restaurantRepository,
                imageRepository,
                prismaService,
              ),
            ),
        },
      ],
      exports: [RestaurantUsecasesProxyModule.CREATE_RESTAURANT_USECASE],
    };
  }
}
