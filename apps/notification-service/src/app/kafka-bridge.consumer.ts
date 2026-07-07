import { Injectable, OnModuleInit } from '@nestjs/common';

/**
 * Bridges the Kafka domain-event stream into RabbitMQ. Kafka stays the
 * ordered, replayable backbone (Audit also reads it); RabbitMQ is where
 * per-channel routing (email/sms/push exchange + routing key), priority
 * queues, and DLQ semantics are easy to configure — better fit for
 * "deliver once, no replay needed" notification fan-out than Kafka.
 */
@Injectable()
export class KafkaBridgeConsumer implements OnModuleInit {
  // TODO: kafkajs consumer on KAFKA_TOPICS.BOOKING_EVENTS + PAYMENT_EVENTS, consumer
  // group "notification-service", republish relevant event types onto the
  // "notifications" RabbitMQ exchange (routing key = channel). Only commit the
  // Kafka offset AFTER the RabbitMQ publish confirms — otherwise a crash between
  // the two drops the notification silently instead of just redelivering it.
  async onModuleInit() {
    // not connected yet
  }
}
