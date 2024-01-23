import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { SecurityModule } from './security/security.module';
import { CryptoModule } from './crypto/crypto.module';

@Module({
  imports: [DatabaseModule, SecurityModule, CryptoModule],
})
export class CoreModule {}
