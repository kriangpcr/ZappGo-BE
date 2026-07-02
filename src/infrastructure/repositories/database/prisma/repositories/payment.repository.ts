import { PaymentRepository } from '@domain/repositories/database';
import { Injectable } from '@nestjs/common';
import { PrismaRepository } from '../prisma.repository';
import { Payment, PaymentStatus } from '@domain/model';
import { PrismaTransaction } from '../prisma.transaction';
import { PrismaPaymentMapper } from '../mapper/payment.mapper';

@Injectable()
export class PrismaPaymentRepository
  extends PrismaRepository
  implements PaymentRepository
{
  async getByOrderId(orderId: string): Promise<Payment | null> {
    return this.getConnection(null)
      .payment.findFirst({ where: { order_id: orderId } })
      .then(PrismaPaymentMapper.toDomain);
  }

  async getByStatus(status: PaymentStatus): Promise<Payment[]> {
    return this.getConnection(null)
      .payment.findMany({ where: { status } })
      .then((payments) => payments.map(PrismaPaymentMapper.toDomain));
  }

  async getAll(tx?: PrismaTransaction): Promise<Payment[]> {
    return this.getConnection(tx)
      .payment.findMany()
      .then((payments) => payments.map(PrismaPaymentMapper.toDomain));
  }

  async getById(id: string, tx?: PrismaTransaction): Promise<Payment> {
    return this.getConnection(tx)
      .payment.findUnique({ where: { id } })
      .then(PrismaPaymentMapper.toDomain);
  }

  async create(entity: Payment, tx?: PrismaTransaction): Promise<Payment> {
    return this.getConnection(tx)
      .payment.create({ data: PrismaPaymentMapper.toPrisma(entity) })
      .then(PrismaPaymentMapper.toDomain);
  }

  async createMany(
    entities: Payment[],
    tx?: PrismaTransaction,
  ): Promise<{ count: number }> {
    return this.getConnection(tx).payment.createMany({
      data: entities.map(PrismaPaymentMapper.toPrisma),
    });
  }

  async update(entity: Payment, tx?: PrismaTransaction): Promise<Payment> {
    return this.getConnection(tx)
      .payment.update({
        where: { id: entity.id },
        data: PrismaPaymentMapper.toPrisma(entity),
      })
      .then(PrismaPaymentMapper.toDomain);
  }

  async remove(id: string, tx?: PrismaTransaction): Promise<Payment> {
    return this.getConnection(tx)
      .payment.delete({ where: { id } })
      .then(PrismaPaymentMapper.toDomain);
  }
}
