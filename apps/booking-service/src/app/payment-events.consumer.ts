import { Injectable, OnModuleInit } from '@nestjs/common';
import { BookingService } from './booking.service';

/**
 * Saga compensation edge: consumes `payment-events` (payment.completed /
 * payment.failed) so a failed payment releases the held tier quantity
 * instead of leaving it stuck HOLDING forever.
 */
@Injectable()
export class PaymentEventsConsumer implements OnModuleInit {
  constructor(private readonly bookingService: BookingService) {}

  // TODO: kafkajs consumer subscribed to KAFKA_TOPICS.PAYMENT_EVENTS, consumer group
  // "booking-service", route by envelope.eventType to confirmFromPayment / release.
  // Kafka has no built-in DLQ (unlike the RabbitMQ side) — wrap the handler in
  // try/catch with a bounded retry count, then on exhaustion produce the envelope
  // to a "payment-events.dlq" topic and commit the offset anyway so one poison
  // message can't block the whole partition.
  async onModuleInit() {
    // not connected yet
  }
}
