import { Test, TestingModule } from '@nestjs/testing';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { ConfigService } from '@nestjs/config';

describe('EmailController', () => {
  let controller: EmailController;
  let emailService: EmailService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmailController],
      providers: [
        {
          provide: EmailService,
          useValue: {
            sendReport: jest.fn(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockImplementation((key: string) => {
              const config = {
                'CORREO_SISTEMA_INCENDIOS': 'incendios@domain.com',
                'CORREO_SISTEMA_NAVAL': 'naufragios@domain.com',   
              };
              return config[key];
            }),        
          },
        },
      ],
    }).compile();
    
    emailService = module.get<EmailService>(EmailService);
    configService = module.get<ConfigService>(ConfigService);
    controller = module.get<EmailController>(EmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('sendFireEmail', () => {
    it('should call sendReport with the correct parameters', async () => {
      const emailDto = { correo: 'test@domain.com' };

      await controller.sendFireEmail(emailDto);

      expect(emailService.sendReport).toHaveBeenCalledWith(
        emailDto.correo,
        'incendios@domain.com'
      );
    });
  });

  describe('sendNavalEmail', () => {
    it('should call sendReport with the correct parameters', async () => {
      const emailDto = { correo: 'test@domain.com' };

      await controller.sendNavalEmail(emailDto);

      expect(emailService.sendReport).toHaveBeenCalledWith(
        emailDto.correo,
        'naufragios@domain.com'
      );
    });
  });
});
