import { BookingStatus } from '@booking-platform/dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * The idempotency-key dedup lives on this row itself (unique index below)
 * instead of a separate dedup table — a booking IS the record we'd dedup
 * against, so a second table would just be a redundant lookup with its own
 * cleanup/TTL problem.
 */
@Entity({ name: 'bookings' })
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ name: 'user_id' })
  userId!: string;

  @Column({ name: 'event_id' })
  eventId!: string;

  @Column({ name: 'tier_id' })
  tierId!: string;

  @Column()
  quantity!: number;

  @Column({ name: 'total_amount', type: 'numeric', precision: 12, scale: 2 })
  totalAmount!: number;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.HOLDING })
  status!: BookingStatus;

  @Index({ unique: true })
  @Column({ name: 'idempotency_key' })
  idempotencyKey!: string;

  @Column({ name: 'hold_expires_at', type: 'timestamptz', nullable: true })
  holdExpiresAt?: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}
