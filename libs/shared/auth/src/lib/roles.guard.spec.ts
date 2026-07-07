import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '@booking-platform/dto';
import { RolesGuard } from './roles.guard';

function contextWithUser(
  user: { role: UserRole } | undefined,
  requiredRoles: UserRole[] | undefined,
) {
  const reflector = {
    getAllAndOverride: jest.fn().mockReturnValue(requiredRoles),
  } as unknown as Reflector;
  const context = {
    getHandler: () => undefined,
    getClass: () => undefined,
    switchToHttp: () => ({ getRequest: () => ({ user }) }),
  } as unknown as ExecutionContext;
  return { guard: new RolesGuard(reflector), context };
}

describe('RolesGuard', () => {
  it('allows the request when no roles are required', () => {
    const { guard, context } = contextWithUser(
      { role: UserRole.USER },
      undefined,
    );
    expect(guard.canActivate(context)).toBe(true);
  });

  it('allows the request when the user has one of the required roles', () => {
    const { guard, context } = contextWithUser({ role: UserRole.ORGANIZER }, [
      UserRole.ORGANIZER,
      UserRole.ADMIN,
    ]);
    expect(guard.canActivate(context)).toBe(true);
  });

  it('denies the request when the user lacks a required role', () => {
    const { guard, context } = contextWithUser({ role: UserRole.USER }, [
      UserRole.ADMIN,
    ]);
    expect(guard.canActivate(context)).toBe(false);
  });
});
