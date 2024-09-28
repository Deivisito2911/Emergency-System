import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Email')
@Controller('email')
export class EmailController {
  constructor(
    private emailService: EmailService,
    private configService: ConfigService
  ) {}
  @Post('incendios')
  sendFireEmail(@Body() emaildto: any) {
    return this.emailService.sendReport(
      emaildto.correo,
      this.configService.get<string>('CORREO_SISTEMA_INCENDIOS')
    );
  }

  @Post('naufragios')
  sendNavalEmail(@Body() emaildto: any) {
    return this.emailService.sendReport(
      emaildto.correo,
      this.configService.get<string>('CORREO_SISTEMA_NAVAL')
    );
  }
}
