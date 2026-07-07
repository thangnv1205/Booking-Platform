import { Controller, Get, Param } from '@nestjs/common';
import { BookingService } from './booking.service';

/** Internal-only surface for Payment Service's checkout call; not exposed through the Gateway. */
@Controller('internal/bookings')
export class InternalBookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }
}
