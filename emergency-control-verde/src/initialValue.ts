import { v4 as uuidv4 } from 'uuid';

export const initialIncidenteValues = {
  lugar: '',
  cantidad_afectados: undefined,
  tipo: '',
  descripcion: '',
};

export const initialDenuncianteValues = {
  id: uuidv4(),
  nombre: '',
  telefono: '',
  cedula: '',
};

export const initialAfectadoValues = {
  id: uuidv4(),
  cedula: '',
  nombre: '',
  apellido: '',
  fecha_de_nacimiento: '',
  sexo: '',
  afecciones: '',
  estado: '',
  tipo_sangre: '',
};
