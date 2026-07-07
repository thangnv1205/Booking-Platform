import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefundRequestedData } from '@booking-platform/dto';
import { PaymentEntity } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly payments: Repository<PaymentEntity>,
  ) {}

  /**
   * TODO — triggered synchronously by POST /payments/checkout (user-waited action,
   * not event-driven): circuit-breaker-wrapped REST call to Booking Service
   * `GET /internal/bookings/:id` for amount + HOLDING status, dedup on
   * transactionRef, call mock payment gateway, write Payment row, outbox
   * `payment.completed` or `payment.failed` — the compensation trigger
   * Booking Service listens for to release the held tier quantity.
   */
  async checkout(_bookingId: string) {
    throw new Error('not implemented');
  }

  // TODO — triggered by consuming `refund.requested`: mock gateway refund call,
  // update Payment row, outbox `refund.completed`
  async processRefund(_data: RefundRequestedData) {
    throw new Error('not implemented');
  }

  async findByBookingId(_bookingId: string) {
    throw new Error('not implemented');
  }
}
