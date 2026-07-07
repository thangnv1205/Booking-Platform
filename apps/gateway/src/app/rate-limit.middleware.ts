import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * Sliding-window rate limit backed by Redis (not in-memory) because the
 * Gateway runs as multiple pods — per-instance counters would let each pod
 * grant its own quota instead of sharing one across the fleet.
 */
@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  // TODO: ioredis sorted-set sliding window keyed by IP (and by userId post-auth for
  // login endpoints specifically, per design doc's brute-force note)
  use(_req: Request, _res: Response, next: NextFunction) {
    next();
  }
}
