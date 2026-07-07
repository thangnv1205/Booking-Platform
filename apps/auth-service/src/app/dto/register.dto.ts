import { UserRole } from '@booking-platform/dto';
import { IsEmail, IsIn, IsOptional, MinLength } from 'class-validator';

/** Public self-registration can only ever create USER or ORGANIZER accounts — ADMIN is seeded separately. */
const SELF_REGISTERABLE_ROLES = [UserRole.USER, UserRole.ORGANIZER] as const;

export class RegisterDto {
  @IsEmail()
  email!: string;

  @MinLength(8)
  password!: string;

  @IsOptional()
  @IsIn(SELF_REGISTERABLE_ROLES)
  role?: UserRole;
}
