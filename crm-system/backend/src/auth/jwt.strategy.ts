import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'antigravity_secret_key_2024',
    });
  }

  validate(payload: JwtPayload) {
    console.log('JwtStrategy: Validated payload:', payload);
    const userId: string = payload.sub;
    const email: string = payload.email;
    const role: string = payload.role;
    return { userId, email, role };
  }
}
