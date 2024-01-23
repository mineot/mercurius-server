import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  async hash(text: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(text, salt);
  }

  async check(text: string, hashedText: string): Promise<boolean> {
    return await bcrypt.compare(text, hashedText);
  }
}
