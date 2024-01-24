import { BadRequestException } from '@nestjs/common';

export interface BadRequestTemplateError {
  origin: string[];
  i18nRef: string;
  error: Error;
}

export class BadRequestError {
  private $template: BadRequestTemplateError;

  constructor({ origin, i18nRef, error }: BadRequestTemplateError) {
    this.$template = { origin, i18nRef, error };
  }

  doThrow() {
    throw new BadRequestException({
      origin: this.$template.origin,
      i18nRef: this.$template.i18nRef,
      message: this.$template.error.message,
      error: this.$template.error,
    });
  }
}
