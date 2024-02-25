import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Admin } from '@prisma/client';
import { ConfigureDTO } from './app.dto';
import { AppService } from './app.service';
import { PublicGuard } from './core/resource/guard/public.guard';
import { CryptoService } from './core/security/crypto.service';

@Controller()
export class AppController {
  constructor(
    private readonly $cryptoService: CryptoService,
    private readonly $appService: AppService,
  ) {}

  // TODO remove this route
  @Get('test')
  async test() {
    await this.$cryptoService.check(null, null);
    return 'Test';
  }

  @Get()
  @UseGuards(PublicGuard)
  async index(): Promise<any> {
    return this.$appService.index();
  }

  @Post('configure')
  async configure(@Body() data: ConfigureDTO): Promise<Admin> {
    return this.$appService.configure(data);
  }
}
