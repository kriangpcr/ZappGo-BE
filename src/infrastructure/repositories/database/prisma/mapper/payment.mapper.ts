import { Payment, PaymentMethod, PaymentStatus } from '@domain/model';
import { Payment as PrismaPayment } from '@prisma/client';

export class PrismaPaymentMapper {
  public static toPrisma(payment: Partial<Payment>): PrismaPayment {
    return {
      id: payment.id,
      order_id: payment.order_id,
      method: payment.method,
      status: payment.status,
      paid_at: payment.paid_at,
    };
  }

  public static toDomain(payment: PrismaPayment): Payment {
    if (!payment) return null;
    return Payment.reconstitute({
      ...payment,
      method: payment.method as PaymentMethod,
      status: payment.status as PaymentStatus,
    });
  }
}
