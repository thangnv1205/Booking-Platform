import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard, JwtPayload } from '@booking-platform/auth';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  create(
    @Body() dto: CreateBookingDto,
    @Headers('idempotency-key') idempotencyKey: string,
    @Req() req: Request & { user: JwtPayload },
  ) {
    // Required, not just recommended — without it a retried request (client timeout,
    // double-click) creates a second booking against the same tier instead of returning
    // the first one.
    if (!idempotencyKey) {
      throw new BadRequestException('Idempotency-Key header is required');
    }
    return this.bookingService.createHold(req.user.sub, dto, idempotencyKey);
  }

  @Post(':id/cancel')
  cancel(@Param('id') id: string, @Req() req: Request & { user: JwtPayload }) {
    return this.bookingService.cancel(id, req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }
}
