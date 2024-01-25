import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { TokenService } from './token.service';

@Module({
  providers: [CryptoService, TokenService],
  exports: [CryptoService, TokenService],
})
export class SecurityModule {}
