import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async index(): Promise<any> {
    return { index: 'Hello World!' };
  }
}
