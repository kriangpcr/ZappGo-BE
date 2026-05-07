import { Payment, PaymentStatus } from '@domain/model';
import { IGenericRepository } from './abstracts/generic-repository.abstract';

export abstract class PaymentRepository extends IGenericRepository<Payment> {
  abstract getByOrderId(orderId: string): Promise<Payment | null>;
  abstract getByStatus(status: PaymentStatus): Promise<Payment[]>;
}
