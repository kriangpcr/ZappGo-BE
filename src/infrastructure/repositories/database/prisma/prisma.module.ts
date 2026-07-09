import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  PrismaUserRepository,
  PrismaAddressRepository,
  PrismaRestaurantRepository,
  PrismaMenuRepository,
  PrismaOrderRepository,
  PrismaOrderItemRepository,
  PrismaCartRepository,
  PrismaCartItemRepository,
  PrismaPaymentRepository,
  PrismaImageRepository,
} from './repositories';
import {
  UserRepository,
  AddressRepository,
  RestaurantRepository,
  MenuRepository,
  OrderRepository,
  OrderItemRepository,
  CartRepository,
  CartItemRepository,
  PaymentRepository,
  ImageRepository,
} from '@domain/repositories/database';
import { EnvironmentConfigModule } from '@infrastructure/config/environment-config.module';

const prismaRepositories = [
  { provide: UserRepository, useClass: PrismaUserRepository },
  { provide: AddressRepository, useClass: PrismaAddressRepository },
  { provide: RestaurantRepository, useClass: PrismaRestaurantRepository },
  { provide: MenuRepository, useClass: PrismaMenuRepository },
  { provide: OrderRepository, useClass: PrismaOrderRepository },
  { provide: OrderItemRepository, useClass: PrismaOrderItemRepository },
  { provide: CartRepository, useClass: PrismaCartRepository },
  { provide: CartItemRepository, useClass: PrismaCartItemRepository },
  { provide: PaymentRepository, useClass: PrismaPaymentRepository },
  { provide: ImageRepository, useClass: PrismaImageRepository },
];

@Module({
  imports: [EnvironmentConfigModule],
  providers: [PrismaService, ...prismaRepositories],
  exports: [PrismaService, ...prismaRepositories],
})
export class PrismaModule {}
