import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly $jwt: JwtService) {}

  async sign(data: any): Promise<any> {
    return {
      accessToken: this.$jwt.sign(
        // {
        //   id: user.id,
        //   name: user.name,
        //   email: user.email,
        // },
        data,
        {
          subject: 'subject', //TODO token description
          expiresIn: '30 minutes', //TODO need define
          issuer: 'users???', //TODO define to user type
          audience: 'login???', //TODO define the objective of this token
        },
      ),
    };
  }

  async verify(token: string): Promise<boolean> {
    await this.$jwt.verify(token, {
      issuer: 'users???',
      audience: 'login???',
    });
    return true;
  }
}
