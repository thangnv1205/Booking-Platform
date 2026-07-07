describe('AuthService', () => {
  // TODO: register() hashes password with bcrypt, rejects duplicate email (409)
  it.todo('register hashes the password and rejects a duplicate email');

  // TODO: login() enforces Redis-backed lockout after N failed attempts within a window
  it.todo('login locks out after repeated failed attempts');

  // TODO: login() issues an access token (RS256) + opaque refresh token stored in Redis
  it.todo('login issues an access + refresh token pair on success');

  // TODO: refresh() rotates — old refresh token must be rejected after use (replay detection)
  it.todo('refresh rotates the token and rejects the old one on reuse');

  // TODO: logout() removes the refresh token from Redis so it can't be reused
  it.todo('logout invalidates the refresh token');
});
