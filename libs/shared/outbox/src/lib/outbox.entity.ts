import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

/**
 * One row per domain event to publish. Debezium's outbox EventRouter (see
 * infra/debezium/*.json) tails this table via Postgres logical replication
 * and republishes `payload` as the Kafka record value on the topic named by
 * `aggregate_type`, keyed by `aggregate_id` — so events for the same
 * aggregate stay ordered within a partition.
 */
@Entity({ name: 'outbox' })
export class OutboxEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ name: 'aggregate_type' })
  aggregateType!: string;

  @Column({ name: 'aggregate_id' })
  aggregateId!: string;

  @Column({ name: 'event_type' })
  eventType!: string;

  @Column({ type: 'jsonb' })
  payload!: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}
