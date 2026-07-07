import { randomUUID } from 'node:crypto';
import type { EntityManager, QueryDeepPartialEntity } from 'typeorm';
import type { EventEnvelope, EventType } from '@booking-platform/dto';
import { OutboxEntity } from './outbox.entity';

export interface WriteOutboxEventParams<T> {
  /** Kafka topic this event is routed to — becomes the outbox `aggregate_type` column. */
  topic: string;
  /** Partition key — same aggregateId always lands on the same partition, preserving order. */
  aggregateId: string;
  eventType: EventType;
  data: T;
}

/**
 * Insert an outbox row using the given transactional EntityManager so the
 * event write commits atomically with the business-data write it describes.
 * Must be called inside the same DB transaction as the state change.
 */
export async function writeOutboxEvent<T>(
  manager: EntityManager,
  params: WriteOutboxEventParams<T>,
): Promise<void> {
  const envelope: EventEnvelope<T> = {
    schemaVersion: 1,
    eventId: randomUUID(),
    eventType: params.eventType,
    occurredAt: new Date().toISOString(),
    data: params.data,
  };

  // TypeORM's DeepPartial mis-maps index-signature column types (jsonb `payload`
  // here), so `insert()`'s param type can't be satisfied without this cast.
  await manager.getRepository(OutboxEntity).insert({
    aggregateType: params.topic,
    aggregateId: params.aggregateId,
    eventType: params.eventType,
    payload: envelope,
  } as unknown as QueryDeepPartialEntity<OutboxEntity>);
}
