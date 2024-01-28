import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * Throws an error if the value is empty.
 * @param {string} value - the value to check
 * @param {string} message - the error message to throw
 * @throws {Error} throw an error if the value is empty
 */
const throwError = (value: string, message: string) => {
  if (!value || !value.length) {
    throw new Error(message);
  }
};

/**
 * Service for handling cryptographic operations.
 */
@Injectable()
export class CryptoService {
  /**
   * Asynchronously hashes the input text using bcrypt.
   * @param {string} text - the text to be hashed
   * @return {Promise<string>} the hashed text
   * @throws {Error} throw an error if the text is null or empty
   */
  async hash(text: string): Promise<string> {
    throwError(text, 'text cannot be null or empty');
    const salt: string = await bcrypt.genSalt();
    const hashedText: string = await bcrypt.hash(text, salt);
    return hashedText;
  }

  /**
   * Checks if the given text matches the hashed text.
   * @param {string} text - the plain text to compare
   * @param {string} hashedText - the hashed text to compare against
   * @return {Promise<boolean>} a boolean indicating whether the text matches the hashed text
   * @throws {Error} throw an error if the text or hashedText is null or empty
   */
  async check(text: string, hashedText: string): Promise<boolean> {
    throwError(text, 'text cannot be null or empty');
    throwError(hashedText, 'hashedText cannot be null or empty');
    return await bcrypt.compare(text, hashedText);
  }
}
