import { UserRole } from '@booking-platform/dto';

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
}
