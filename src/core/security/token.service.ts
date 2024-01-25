import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/**
 * Service for handling tokens.
 */
@Injectable()
export class TokenService {
  constructor(private readonly $jwt: JwtService) {}

  /**
   * Asynchronously signs the index.
   * @return {Promise<string>} the signed index
   * @throws {Error} throw an error if the singed fails
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
      throw err.message;
    }
  }

  /**
   * Verify the index using the given token.
   * @param {string} token - The token to be verified
   * @return {Promise<boolean>} A boolean indicating the verification result
   * @throws {Error} throw an error if the verification fails
   */
  async verifyIndex(token: string): Promise<boolean> {
    try {
      await this.$jwt.verifyAsync(token, {
        issuer: 'guest',
        audience: 'index',
      });

      return true;
    } catch (err) {
      throw err.message;
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
  //         subject: 'subject',
  //         expiresIn: '30 minutes',
  //         issuer: 'users???',
  //         audience: 'login???',
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
