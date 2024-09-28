export default () => ({
  mailer: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'equipo.verde.cum@gmail.com',
      pass: 'azcm wrjp ahdt asnb',
    },
  },
  sender: {
    from: {
      name: 'SISTEMA DE EMERGENCIA',
      address: 'equipo.verde.cum@gmail.com',
    },
  },
});

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

interface EmailSenderConfig {
  from: {
    name: string;
    address: string;
  };
}

export { EmailConfig, EmailSenderConfig };
