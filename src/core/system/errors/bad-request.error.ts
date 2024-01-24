import { BadRequestException } from '@nestjs/common';

/**
 * Represents a template error for bad requests.
 * @interface
 */
export interface BadRequestTemplateError {
  /**
   * The origin of the error.
   * @type {string[]}
   */
  origin: string[];
  /**
   * The internationalization reference for the error.
   * @type {string}
   */
  i18nRef: string;
  /**
   * The error object.
   * @type {Error}
   */
  error: Error;
}

/**
 * Represents a BadRequestError, abstracting from BadRequestException.
 */
export class BadRequestError {
  private $template: BadRequestTemplateError;

  /**
   * Creates an instance of BadRequestError.
   * @param {object} options - The options for creating the BadRequestError.
   * @param {string} options.origin - The origin of the error.
   * @param {string} options.i18nRef - The internationalization reference of the error.
   * @param {Error} options.error - The error object.
   */
  constructor({ origin, i18nRef, error }: BadRequestTemplateError) {
    this.$template = { origin, i18nRef, error };
  }

  /**
   * Throws a BadRequestException with the values from the $template property.
   * @throws {BadRequestException}
   */
  doThrow() {
    throw new BadRequestException({
      origin: this.$template.origin,
      i18nRef: this.$template.i18nRef,
      message: this.$template.error.message,
      error: this.$template.error,
    });
  }
}
