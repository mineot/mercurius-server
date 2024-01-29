import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

/**
 * Throws a BadRequestException with the given message.
 *
 * @param {string} message - the message for the BadRequestException
 * @return {void} - void
 * @throws {BadRequestException} throw a BadRequestException with the given message
 */
const throwBadRequest = (message: string): void => {
  throw new BadRequestException(message);
};

/**
 * Checks if the given value is empty, and throws a bad request error with the provided message if it is.
 *
 * @param {string} value - the value to be checked for emptiness
 * @param {string} message - the message to be included in the bad request error
 * @throws {BadRequestException} throw a BadRequestException with the provided message
 */
const checkValueEmpty = (value: string, message: string): void => {
  if (!value || !value.length) {
    throwBadRequest(message);
  }
};

/**
 * Service for handling cryptographic operations.
 */
@Injectable()
export class CryptoService {
  /**
   * Asynchronously hashes the input text using bcrypt.
   *
   * @param {string} text - the text to be hashed
   * @return {Promise<string>} the hashed text
   * @throws {BadRequestException} throw an error if the text is null or empty
   */
  async hash(text: string): Promise<string> {
    checkValueEmpty(text, 'crypto hash failed');

    try {
      const salt: string = await bcrypt.genSalt();
      const hashedText: string = await bcrypt.hash(text, salt);
      return hashedText;
    } catch (err) {
      throwBadRequest(err.message);
    }
  }

  /**
   * Checks if the given text matches the hashed text.
   *
   * @param {string} text - the plain text to compare
   * @param {string} hashedText - the hashed text to compare against
   * @return {Promise<boolean>} a boolean indicating whether the text matches the hashed text
   * @throws {BadRequestException} throw an error if the text or hashedText is null or empty
   */
  async check(text: string, hashedText: string): Promise<boolean> {
    checkValueEmpty(text, 'crypto check failed');
    checkValueEmpty(hashedText, 'crypto check failed');

    try {
      return await bcrypt.compare(text, hashedText);
    } catch (err) {
      throwBadRequest(err.message);
    }
  }
}
