import { Module } from '@nestjs/common';
import { CryptoModule } from './crypto/crypto.module';
import { DatabaseModule } from './database/database.module';
import { SecurityModule } from './security/security.module';

@Module({
  imports: [DatabaseModule, SecurityModule, CryptoModule],
})
export class CoreModule {}
