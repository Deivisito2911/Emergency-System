import Axios from 'axios';
import { getToken } from '@emgencias-udo/lib/shared-react-auth';
const port = import.meta.env.VITE_SERVER_PORT_VERDE;
const url_back = `http://localhost:${port}/api`;
const token = getToken();

export const getIncidencias = async () => {
  return Axios.get(`${url_back}/incidencia`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getIncidenciaById = (id: string) => {
  return Axios.get(`${url_back}/incidencia/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createIncidencia = async (data: any) => {
  return await Axios.post(`${url_back}/incidencia`, JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};
export const patchIncidencia = async (id: string, data: any) => {
  return await Axios.patch(
    `${url_back}/incidencia/${id}`,
    JSON.stringify(data),
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
