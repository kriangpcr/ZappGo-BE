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
  async getAll(tx?: PrismaTransaction): Promise<Image[]> {
    return this.getConnection(tx)
      .image.findMany()
      .then((images) => images.map(PrismaImageMapper.toDomain));
  }

  async getById(id: string | number, tx?: PrismaTransaction): Promise<Image> {
    return this.getConnection(tx)
      .image.findUnique({
        where: { id: String(id) },
      })
      .then(PrismaImageMapper.toDomain);
  }

  async create(entity: Image, tx?: PrismaTransaction): Promise<Image> {
    return this.getConnection(tx)
      .image.create({
        data: PrismaImageMapper.toPrisma(entity),
      })
      .then(PrismaImageMapper.toDomain);
  }

  async createMany(
    entities: Image[],
    tx?: PrismaTransaction,
  ): Promise<{ count: number }> {
    return this.getConnection(tx).image.createMany({
      data: entities.map(PrismaImageMapper.toPrisma),
    });
  }

  async update(entity: Image, tx?: PrismaTransaction): Promise<Image> {
    return this.getConnection(tx)
      .image.update({
        where: { id: entity.id },
        data: PrismaImageMapper.toPrisma(entity),
      })
      .then(PrismaImageMapper.toDomain);
  }

  async remove(id: string | number, tx?: PrismaTransaction): Promise<Image> {
    return this.getConnection(tx)
      .image.delete({
        where: { id: String(id) },
      })
      .then(PrismaImageMapper.toDomain);
  }
}
