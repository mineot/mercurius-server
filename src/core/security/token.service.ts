import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly $jwtService: JwtService) {}

  async signIndex(): Promise<string> {
    try {
      return await this.$jwtService.signAsync(
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

  async verifyIndex(token: string): Promise<boolean> {
    try {
      await this.$jwtService.verifyAsync(token, {
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
