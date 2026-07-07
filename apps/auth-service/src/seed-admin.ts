/**
 * One-off script to create the first ADMIN account — self-registration
 * (see dto/register.dto.ts) deliberately can't create ADMIN, so this is the
 * only way to get one. Run once against a fresh database:
 *   pnpm seed:admin
 *
 * TODO: implement once AuthService's bcrypt hashing (auth.service.ts) is done —
 * reuse the same hashing there rather than re-implementing it here, so a
 * seeded admin's password always hashes the same way a registered user's does:
 * 1. read ADMIN_EMAIL / ADMIN_PASSWORD from env (fail fast if missing)
 * 2. connect a TypeORM DataSource to auth_db
 * 3. skip if a user with that email already exists (idempotent re-run)
 * 4. bcrypt-hash the password, insert UserEntity with role=ADMIN
 */
async function seedAdmin(): Promise<void> {
  throw new Error('not implemented');
}

seedAdmin();
