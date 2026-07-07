import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import {
  JwtAuthGuard,
  JwtPayload,
  Roles,
  RolesGuard,
} from '@booking-platform/auth';
import { UserRole } from '@booking-platform/dto';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @Post()
  create(
    @Body() dto: CreateEventDto,
    @Req() req: Request & { user: JwtPayload },
  ) {
    return this.eventService.create(req.user.sub, dto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }
}
