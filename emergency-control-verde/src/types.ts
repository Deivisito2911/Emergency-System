export interface Denunciante {
  id: string;
  nombre: string;
  telefono: string;
  cedula?: string;
}

export interface Incidente {
  lugar: string;
  cantidad_afectados: number;
  tipo: string;
  descripcion?: string;
}

export interface Afectado {
  id: string;
  cedula: string;
  nombre: string;
  apellido: string;
  fecha_de_nacimiento: string;
  sexo?: string;
  afecciones?: string;
  estado?: string;
  tipo_sangre?: string;
}

export interface DatosGestionFichas {
  codigo: string;
  operador: string;
  denunciante: string;
  afectados: string
  fecha: string;
  tipo: string;
  cantidad_afectados: number;
  lugar: string;
}
