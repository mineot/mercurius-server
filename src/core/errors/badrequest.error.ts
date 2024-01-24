/**
 * Represents a bad request error.
 * @interface
 */
export interface BadRequestError {
  /**
   * An array of strings representing the origin of the error.
   */
  origin: string[];
  /**
   * A string referencing internationalization resources for the error message.
   */
  i18nRef: string;
  /**
   * A string representing the error message.
   */
  message: string;
  /**
   * An optional field for including nested error details.
   */
  error?: Error;
}
