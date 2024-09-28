import { Afectado } from '../afectado/afectado.entity';
import { Denunciante } from '../denunciante/denunciante.entity';
import { Operador } from '../operador/operador.entity';

export interface IIncidencia {
  codigo: string;
  fecha: Date;
  tipo: string;
  lugar: string;
  cantidad_afectados: number;
  descripcion: string;
  operador: Operador;
  afectados: Afectado[];
  denunciante: Denunciante;
}
