import { All, Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard, Roles, RolesGuard } from '@booking-platform/auth';
import { UserRole } from '@booking-platform/dto';
import { ProxyService } from './proxy.service';

@Controller()
export class ProxyController {
  constructor(private readonly proxyService: ProxyService) {}

  // register/login/refresh are public by design (that's how a client gets a token in
  // the first place); logout only needs the opaque refresh token, not a Bearer JWT
  @All('auth/*path')
  auth(@Req() req: Request, @Param('path') path: string) {
    return this.proxyService.forward('auth', path, req);
  }

  @Get('events/*path')
  browseEvents(@Req() req: Request, @Param('path') path: string) {
    return this.proxyService.forward('events', path, req);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER, UserRole.ADMIN)
  @All('events/*path')
  manageEvents(@Req() req: Request, @Param('path') path: string) {
    return this.proxyService.forward('events', path, req);
  }

  @UseGuards(JwtAuthGuard)
  @All('bookings/*path')
  bookings(@Req() req: Request, @Param('path') path: string) {
    return this.proxyService.forward('bookings', path, req);
  }

  @UseGuards(JwtAuthGuard)
  @All('payments/*path')
  payments(@Req() req: Request, @Param('path') path: string) {
    return this.proxyService.forward('payments', path, req);
  }
}
