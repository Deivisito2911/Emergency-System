import { Operador } from '../operador/operador.entity';
import { Organismo } from '../organismo/organismo.entity';
import { Denunciante } from '../denunciante/denunciante.entity';
import { Afectado } from '../afectado/afectado.entity';
import { Incidencia } from '../incidencia/incidencia.entity';

export default () => ({
  dbConfig: {
    type: process.env.DB_VERDE_TYPE,
    host: process.env.DB_VERDE_HOST,
    port: process.env.DB_VERDE_PORT,
    username: process.env.DB_VERDE_USER,
    password: process.env.DB_VERDE_PASSWORD,
    database: process.env.DB_VERDE_NAME,
    entities: [Operador, Organismo, Denunciante, Afectado, Incidencia],
    synchronize: process.env.DB_VERDE_SYNC,
    autoLoadEntities: process.env.DB_VERDE_AUTOLOAD,
  },
});
