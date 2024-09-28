import * as nodemailer from 'nodemailer';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { EmailConfig, EmailSenderConfig } from './email.configuration';
import { LogsService } from '../logs/logs.service';
import { tiposIncidencia } from '../incidencia/const/tiposIncidencia';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;
  private fichaTemplate: handlebars.TemplateDelegate;

  constructor(
    private configService: ConfigService,
    private logService: LogsService
  ) {
    this.transporter = nodemailer.createTransport(
      this.configService.get<EmailConfig>('mailer'),
      this.configService.get<EmailSenderConfig>('sender')
    );
    this.fichaTemplate = this.loadTemplate('ficha.hbs'); //* load handlebars templates
  }

  private loadTemplate(templateName: string): handlebars.TemplateDelegate {
    return handlebars.compile(
      fs.readFileSync(
        path.join(
          this.configService.get<string>('TEMPLATES_FOLDER_PATH_VERDE'),
          templateName
        ),
        'utf8'
      )
    );
  }

  async sendReport(correo: string, incidenciaData: any) {
    const html = this.fichaTemplate({ ...incidenciaData });
    await this.transporter.sendMail({
      to: correo,
      subject: 'INCIDENCIA REPORTADA',
      html: html,
    });
  }

  async notifyOrganismo(tipoIncidencia: string, incidenciaData: any) {
    await this.sendReport(
      this.configService.get<string>(this.selectOrganismo(tipoIncidencia)),
      incidenciaData
    );
  }
  selectOrganismo(tipoIncidencia: string): string {
    const correo = tiposIncidencia.get(tipoIncidencia);
    if (!correo) {
      const error = new BadRequestException(
        'No se proporciono un campo valido para el tipo de la incidencia'
      );
      this.logService.error(error);
      throw error;
    }
    return correo;
  }
}
