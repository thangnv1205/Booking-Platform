import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingReleaseReason } from '@booking-platform/dto';
import { BookingEntity } from './entities/booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookings: Repository<BookingEntity>,
  ) {}

  /**
   * TODO — the core anti-overselling path:
   * 1. dedup on idempotencyKey (return existing booking if found)
   * 2. acquire Redis lock keyed by tierId
   * 3. in one DB transaction: REST call to Event Service for tier price,
   *    optimistic-lock decrement of availableQuantity (retry on VersionMismatch),
   *    insert booking (HOLDING), write outbox `booking.hold`
   * 4. release Redis lock
   */
  async createHold(
    _userId: string,
    _dto: CreateBookingDto,
    _idempotencyKey: string,
  ) {
    throw new Error('not implemented');
  }

  // TODO: called by Kafka consumer on payment.completed -> status CONFIRMED, outbox booking.confirmed
  async confirmFromPayment(_bookingId: string) {
    throw new Error('not implemented');
  }

  // TODO: called by Kafka consumer on payment.failed, or by the hold-expiry job ->
  // status RELEASED/EXPIRED, restore tier availableQuantity, outbox booking.released
  async release(_bookingId: string, _reason: BookingReleaseReason) {
    throw new Error('not implemented');
  }

  // TODO: user-initiated cancel -> outbox booking cancelled + trigger refund.requested via Payment Service
  async cancel(_bookingId: string, _userId: string) {
    throw new Error('not implemented');
  }

  async findOne(_id: string) {
    throw new Error('not implemented');
  }

  // TODO: cron (e.g. @nestjs/schedule) scanning HOLDING rows past holdExpiresAt
  async expireStaleHolds() {
    throw new Error('not implemented');
  }
}
