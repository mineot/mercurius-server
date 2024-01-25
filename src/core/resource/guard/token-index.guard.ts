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
      const headers = request.headers;

      if (
        !headers ||
        !headers.authorization ||
        !headers.authorization.startsWith('Bearer ')
      ) {
        throw 'Authorization bearer header not found';
      }

      const token = headers.authorization.split('Bearer ')[1];

      try {
        await this.$token.verifyIndex(token);
      } catch (err) {
        throw err.message;
      }

      return true;
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
}
