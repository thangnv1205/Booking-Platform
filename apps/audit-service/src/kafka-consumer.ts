/**
 * Consumes every topic in the system (booking-events, payment-events) and
 * writes a raw append-only log to MongoDB — the source of truth for
 * reconciliation and the revenue dashboard aggregation.
 */
export class AuditKafkaConsumer {
  // TODO: kafkajs consumer, consumer group "audit-service", subscribe to
  // KAFKA_TOPICS.BOOKING_EVENTS + PAYMENT_EVENTS, insert each envelope verbatim
  // into Mongo collection `audit_events`. A failed Mongo insert should retry
  // (bounded) rather than commit the offset and silently lose an audit record —
  // this consumer IS the reconciliation source of truth, unlike the others where
  // a dropped-and-DLQ'd message is an acceptable degradation.
  async start(): Promise<void> {
    // not connected yet
  }

  async stop(): Promise<void> {
    // not connected yet
  }
}
