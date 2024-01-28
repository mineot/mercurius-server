import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Admin } from '@prisma/client';
import { ConfigureDTO } from './app.dto';
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

  @Post('configure')
  async configure(@Body() data: ConfigureDTO): Promise<Admin> {
    return this.appService.configure(data);
  }
}
