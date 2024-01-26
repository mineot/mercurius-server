import { TokenService } from '@/core/security/token.service';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

/**
 * Class representing a guard for token index.
 */
@Injectable()
export class TokenIndexGuard implements CanActivate {
  constructor(private readonly $token: TokenService) {}

  /**
   * Determines if the user can activate a certain context.
   * @param {ExecutionContext} context - the execution context
   * @return {Promise<boolean>} a promise that resolves to a boolean indicating if the user can activate the context
   * @throws {ForbiddenException} throws a ForbiddenException if authorization fails
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Get the request from the context
      const request = context.switchToHttp().getRequest();

      // Extract the token from the authorization header
      const token =
        request?.headers?.authorization?.split('Bearer ')[1] ?? null;

      // Throw an error if the token is not found
      if (!token) {
        throw 'Authorization (Bearer) header not found';
      }

      // Verify the token and return the result
      return await this.$token.verifyIndex(token);
    } catch (err) {
      // Throw a ForbiddenException if an error occurs
      throw new ForbiddenException(err);
    }
  }
}
