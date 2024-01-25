import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/**
 * Service for handling tokens.
 */
@Injectable()
export class TokenService {
  /**
   * Constructor for TokenService.
   * @param {JwtService} $jwt - The JwtService instance.
   */
  constructor(private readonly $jwt: JwtService) {}

  /**
   * Signs and returns a token for granting access to public content.
   * @returns {Promise<string>} The signed token.
   */
  async signIndex(): Promise<string> {
    try {
      return await this.$jwt.signAsync(
        {},
        {
          subject: 'granted access to public content',
          issuer: 'guest',
          audience: 'index',
        },
      );
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  /**
   * Verifies the given token for access to public content.
   * @param {string} token - The token to verify.
   * @returns {Promise<boolean>} True if the token is valid, false otherwise.
   */
  async verifyIndex(token: string): Promise<boolean> {
    try {
      await this.$jwt.verifyAsync(token, {
        issuer: 'guest',
        audience: 'index',
      });
      return true;
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }

  // async sign(data: any): Promise<any> {
  //   return {
  //     accessToken: this.$jwt.sign(
  //       // {
  //       //   id: user.id,
  //       //   name: user.name,
  //       //   email: user.email,
  //       // },
  //       data,
  //       {
  //         subject: 'subject', //TODO token description
  //         expiresIn: '30 minutes', //TODO need define
  //         issuer: 'users???', //TODO define to user type
  //         audience: 'login???', //TODO define the objective of this token
  //       },
  //     ),
  //   };
  // }

  // async verify(token: string): Promise<boolean> {
  //   await this.$jwt.verify(token, {
  //     issuer: 'users???',
  //     audience: 'login???',
  //   });
  //   return true;
  // }
}
