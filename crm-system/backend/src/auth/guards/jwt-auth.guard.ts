import { Injectable, ExecutionContext, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader: string | undefined = request.headers.authorization;
    this.logger.log(`JwtAuthGuard: Checking request for ${request.url}`);
    this.logger.log(`Auth Header: ${authHeader ? 'Present' : 'Missing'}`);
    if (authHeader) {
      this.logger.log(`Token Length: ${authHeader.length}`);
      this.logger.log(`Token Prefix: ${authHeader.substring(0, 20)}...`);
    }
    return super.canActivate(context);
  }
}
