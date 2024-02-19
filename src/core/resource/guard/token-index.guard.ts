import { TokenService } from '@/core/security/token.service';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class TokenIndexGuard implements CanActivate {
  constructor(private readonly $token: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();

      const token =
        request?.headers?.authorization?.split('Bearer ')[1] ?? null;

      if (!token) {
        throw 'unauthorized';
      }

      return await this.$token.verifyIndex(token);
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
}
