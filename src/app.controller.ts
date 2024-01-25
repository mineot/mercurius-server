import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { TokenIndexGuard } from './core/system/guards/token-index.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(TokenIndexGuard)
  async index(): Promise<any> {
    return this.appService.index();
  }
}
