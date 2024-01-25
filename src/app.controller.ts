import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { TokenIndexGuard } from './core/resource/guard/token-index.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(TokenIndexGuard)
  async index(): Promise<any> {
    return this.appService.index();
  }
}
