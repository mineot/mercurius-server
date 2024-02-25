import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

const checkValueEmpty = (value: string, message: string): void => {
  if (!value || !value.length) {
    throw message;
  }
};

@Injectable()
export class CryptoService {
  async hash(text: string): Promise<string> {
    try {
      checkValueEmpty(text, 'crypto.hash.failed');

      const salt: string = await bcrypt.genSalt();
      const hashedText: string = await bcrypt.hash(text, salt);
      return hashedText;
    } catch (err) {
      throw err.message;
    }
  }

  async check(text: string, hashedText: string): Promise<boolean> {
    try {
      checkValueEmpty(text, 'crypto.check.failed');
      checkValueEmpty(hashedText, 'crypto.check.failed');

      return await bcrypt.compare(text, hashedText);
    } catch (err) {
      throw err.message;
    }
  }
}
