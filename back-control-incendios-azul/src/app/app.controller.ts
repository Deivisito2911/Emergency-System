import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller('i')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}