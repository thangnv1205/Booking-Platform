import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TicketTierView } from '@booking-platform/dto';
import { EventEntity } from './entities/event.entity';
import { TicketTierEntity } from './entities/ticket-tier.entity';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly events: Repository<EventEntity>,
    @InjectRepository(TicketTierEntity)
    private readonly tiers: Repository<TicketTierEntity>,
  ) {}

  // TODO: insert event + tiers in one transaction, invalidate Redis cache-aside keys
  async create(_organizerId: string, _dto: CreateEventDto) {
    throw new Error('not implemented');
  }

  // TODO: Redis cache-aside (read-through, TTL, invalidate on write)
  async findAll() {
    throw new Error('not implemented');
  }

  // TODO: Redis cache-aside; 404 if not found
  async findOne(_id: string) {
    throw new Error('not implemented');
  }

  /** Consumed by Booking Service over REST (see infra circuit-breaker note in gateway/booking). */
  // TODO: 404 mapping, no caching here (price/availability must be current)
  async findTierForBooking(_tierId: string): Promise<TicketTierView> {
    throw new Error('not implemented');
  }
}
