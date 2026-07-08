import { UserRepository } from '@domain/repositories/database/user.repository';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma.repository';
import { Image } from '@domain/model';
import { PrismaTransaction } from '../prisma.transaction';
import { PrismaImageMapper } from '../mapper/image.mapper';
import { ImageRepository } from '@domain/repositories/database';

@Injectable()
export class PrismaImageRepository
  extends PrismaRepository
  implements ImageRepository
{
  getAll(tx?: PrismaTransaction): Promise<Image[]> {
    throw new Error('Method not implemented.');
  }
  getById(id: string | number, tx?: PrismaTransaction): Promise<Image> {
    throw new Error('Method not implemented.');
  }
  create(entity: Image, tx?: PrismaTransaction): Promise<Image> {
    throw new Error('Method not implemented.');
  }
  createMany(
    entities: Image[],
    tx?: PrismaTransaction,
  ): Promise<{ count: number }> {
    throw new Error('Method not implemented.');
  }
  update(entity: Image, tx?: PrismaTransaction): Promise<Image> {
    throw new Error('Method not implemented.');
  }
  remove(id: string | number, tx?: PrismaTransaction): Promise<Image> {
    throw new Error('Method not implemented.');
  }
}
