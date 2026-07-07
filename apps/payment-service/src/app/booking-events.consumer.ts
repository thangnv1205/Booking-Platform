import { Injectable, OnModuleInit } from '@nestjs/common';
import { PaymentService } from './payment.service';

/** Consumes `booking-events`, only for `refund.requested` (cancel flow) — the
 * initial charge is triggered synchronously via POST /payments/checkout, not
 * by an event, since checkout is a user-waited action. */
@Injectable()
export class BookingEventsConsumer implements OnModuleInit {
  constructor(private readonly paymentService: PaymentService) {}

  // TODO: kafkajs consumer subscribed to KAFKA_TOPICS.BOOKING_EVENTS, consumer group
  // "payment-service", filter envelope.eventType === 'refund.requested' -> processRefund.
  // Same retry/DLQ note as Booking Service's PaymentEventsConsumer: bounded retries,
  // then produce to "booking-events.dlq" and commit the offset rather than blocking.
  async onModuleInit() {
    // not connected yet
  }
}
