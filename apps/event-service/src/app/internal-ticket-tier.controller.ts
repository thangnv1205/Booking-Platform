import { Controller, Get, Param } from '@nestjs/common';
import { EventService } from './event.service';

/** Internal-only surface for Booking Service; not exposed through the Gateway. */
@Controller('internal/ticket-tiers')
export class InternalTicketTierController {
  constructor(private readonly eventService: EventService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findTierForBooking(id);
  }
}
