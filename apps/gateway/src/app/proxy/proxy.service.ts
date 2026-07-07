import { Injectable } from '@nestjs/common';

export const DOWNSTREAM_TARGETS = {
  auth: process.env['AUTH_SERVICE_URL'] ?? 'http://localhost:4001',
  events: process.env['EVENT_SERVICE_URL'] ?? 'http://localhost:4002',
  bookings: process.env['BOOKING_SERVICE_URL'] ?? 'http://localhost:4003',
  payments: process.env['PAYMENT_SERVICE_URL'] ?? 'http://localhost:4004',
} as const;

@Injectable()
export class ProxyService {
  // TODO: one opossum breaker per downstream target (see DOWNSTREAM_TARGETS), forward
  // method/headers/body, map breaker "open" state to 503 instead of hanging the request
  async forward(
    _target: keyof typeof DOWNSTREAM_TARGETS,
    _path: string,
    _req: unknown,
  ) {
    throw new Error('not implemented');
  }
}
