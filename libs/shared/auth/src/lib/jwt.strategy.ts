import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { JwtPayload } from './jwt-payload.interface';

function resolvePublicKey(): Buffer {
  // process.cwd() is the workspace root for every service (nx serve / node dist/main.js
  // are both launched from there), which is more reliable across webpack-bundled dist
  // output than a __dirname-relative guess.
  const path =
    process.env['JWT_PUBLIC_KEY_PATH'] ??
    join(process.cwd(), 'infra/keys/jwt-public.pem');
  return readFileSync(path);
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'],
      secretOrKey: resolvePublicKey(),
    });
  }

  validate(payload: JwtPayload): JwtPayload {
    // TODO: consider a Redis-backed revocation check here for immediate logout enforcement
    return payload;
  }
}
