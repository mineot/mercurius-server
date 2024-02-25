import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Admin } from '@prisma/client';
import { ConfigureDTO } from './app.dto';
import { DBService } from './core/database/db.service';
import { CryptoService } from './core/security/crypto.service';

@Injectable()
export class AppService {
  constructor(
    private readonly $dbService: DBService,
    private readonly $cryptoService: CryptoService,
  ) {}

  async index(): Promise<any> {
    const count: number = await this.$dbService.admin.count();

    if (!count) {
      throw new ForbiddenException('system not configured');
    }

    return { index: 'Hello World!' };
  }

  async configure(data: ConfigureDTO): Promise<Admin> {
    const count: number = await this.$dbService.admin.count();

    if (count) {
      throw new ForbiddenException('system already configured');
    }

    try {
      data.password = await this.$cryptoService.hash(data.password);
      return await this.$dbService.admin.create({ data });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async generateToken(): Promise<any> {
    return null;
  }

  async forgetPassword(): Promise<any> {
    return null;
  }

  async resetPassword(): Promise<any> {
    return null;
  }
}
