import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';
import { LogsService } from '../logs/logs.service';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import { BadRequestException } from '@nestjs/common';

jest.mock('nodemailer');
jest.mock('handlebars');
jest.mock('fs');
jest.mock('path');

describe('EmailService', () => {
  let service: EmailService;
  let logService: LogsService;
  let transporterMock: nodemailer.Transporter;
  let templateMock: jest.Mock;

  beforeEach(async () => {
    transporterMock = {
      sendMail: jest.fn(),
    } as any;

    templateMock = jest.fn().mockReturnValue('<p>Email Template</p>');

    (nodemailer.createTransport as jest.Mock).mockReturnValue(transporterMock);
    (handlebars.compile as jest.Mock).mockReturnValue(templateMock);
    (fs.readFileSync as jest.Mock).mockReturnValue('template content');
    (path.join as jest.Mock).mockReturnValue('template/path/ficha.hbs');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              const config = {
                'mailer': { host: 'smtp.example.com', port: 587 },
                'sender': { from: 'noreply@example.com' },
                'TEMPLATES_FOLDER_PATH_VERDE': '/templates',
                'CORREO_SISTEMA_INCENDIOS': 'incendios@example.com',
                'CORREO_SISTEMA_NAVAL': 'naufragios@example.com',
              };
              return config[key];
            }),
          },
        },
        {
          provide: LogsService,
          useValue: {
            error: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    logService = module.get<LogsService>(LogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('sendReport', () => {
    it('should send an email with the correct parameters', async () => {
      const email = 'test@example.com';
      const data = { key: 'value' };

      await service.sendReport(email, data);

      expect(transporterMock.sendMail).toHaveBeenCalledWith({
        to: email,
        subject: 'INCIDENCIA REPORTADA',
        html: '<p>Email Template</p>',
      });
    });
  });

  describe('notifyOrganismo', () => {
    it('should call sendReport with correct email for incendio', async () => {
      const data = { key: 'value' };

      await service.notifyOrganismo('Incendio', data);

      expect(transporterMock.sendMail).toHaveBeenCalledWith({
        to: 'incendios@example.com',
        subject: 'INCIDENCIA REPORTADA',
        html: '<p>Email Template</p>',
      });
    });

    it('should call sendReport with correct email for naufragio', async () => {
      const data = { key: 'value' };

      await service.notifyOrganismo('Naufragio', data);

      expect(transporterMock.sendMail).toHaveBeenCalledWith({
        to: 'naufragios@example.com',
        subject: 'INCIDENCIA REPORTADA',
        html: '<p>Email Template</p>',
      });
    });

    it('should throw BadRequestException for invalid tipoIncidencia', async () => {
      const data = { key: 'value' };

      await expect(service.notifyOrganismo('invalid', data)).rejects.toThrow(BadRequestException);
      expect(logService.error).toHaveBeenCalledWith(expect.any(BadRequestException));
    });
  });
});
