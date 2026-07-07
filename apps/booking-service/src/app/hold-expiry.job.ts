import { Injectable } from '@nestjs/common';
import { BookingService } from './booking.service';

@Injectable()
export class HoldExpiryJob {
  constructor(private readonly bookingService: BookingService) {}

  // TODO: wire with @nestjs/schedule @Cron/@Interval once BookingService.expireStaleHolds is implemented
  async run() {
    return this.bookingService.expireStaleHolds();
  }
}
