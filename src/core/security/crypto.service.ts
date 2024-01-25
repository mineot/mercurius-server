import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * Service for handling cryptographic operations such as hashing and checking text.
 */
@Injectable()
export class CryptoService {
  /**
   * Hashes the input text and returns the hashed string.
   * @param {string} text - The input text to be hashed.
   * @returns {Promise<string>} A promise that resolves to the hashed string.
   * @throws {BadRequestException} throws an exception if the text is null or empty.
   */
  async hash(text: string): Promise<string> {
    try {
      if (!text || !text.length) {
        throw 'text cannot be null or empty';
      }

      const salt: string = await bcrypt.genSalt();
      const hashedText: string = await bcrypt.hash(text, salt);
      return hashedText;
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  /**
   * Compares the input text with the hashed text using bcrypt.
   * @param {string} text - The input text to be compared.
   * @param {string} hashedText - The hashed text to compare with.
   * @returns {Promise<boolean>} A promise that resolves to a boolean indicating whether the texts match.
   * @throws {BadRequestException} throws an exception if the text or hashedText is null or empty.
   */
  async check(text: string, hashedText: string): Promise<boolean> {
    try {
      if (!text || !text.length) {
        throw 'text cannot be null or empty';
      }

      if (!hashedText || !hashedText.length) {
        throw 'hashedText cannot be null or empty';
      }

      return await bcrypt.compare(text, hashedText);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
