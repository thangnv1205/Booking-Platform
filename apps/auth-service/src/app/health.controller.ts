import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    // TODO: add DB/Redis ping once those clients exist, mirror as /health/ready per design doc
    return { status: 'ok' };
  }
}
