import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { IsUUID } from 'class-validator';
import { JwtAuthGuard } from '@booking-platform/auth';
import { PaymentService } from './payment.service';

class CheckoutDto {
  @IsUUID()
  bookingId!: string;
}

@UseGuards(JwtAuthGuard)
@Controller('payments')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('checkout')
  checkout(@Body() dto: CheckoutDto) {
    return this.paymentService.checkout(dto.bookingId);
  }

  @Get('by-booking/:bookingId')
  findByBooking(@Param('bookingId') bookingId: string) {
    return this.paymentService.findByBookingId(bookingId);
  }
}
