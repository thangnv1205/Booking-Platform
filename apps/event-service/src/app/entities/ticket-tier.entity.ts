import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  VersionColumn,
} from 'typeorm';

/**
 * Quantity-based inventory (not numbered seats): covers both GA ("500 tickets
 * of this tier") and seat-based events (tier = seat category) without a
 * separate per-seat row. `availableQuantity` is the field Booking Service
 * decrements under optimistic lock via `version`.
 */
@Entity({ name: 'ticket_tiers' })
export class TicketTierEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ name: 'event_id' })
  eventId!: string;

  @Column()
  name!: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  price!: number;

  @Column({ name: 'total_quantity' })
  totalQuantity!: number;

  @Column({ name: 'available_quantity' })
  availableQuantity!: number;

  @VersionColumn()
  version!: number;
}
