import { API_URL } from '../../config/API_URL';

export interface Embarcacion {
  id: string;
  nombre: string;
}

export const getEmbarcaciones = () =>
  fetch(`${API_URL}/embarcacion`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const createAlertaRequest = (alerta: {
  descripcion: string;
  embarcacionId: string;
}) =>
  fetch(`${API_URL}/alerta/${alerta.embarcacionId}/embarcacion`, {
    method: 'POST',
    body: JSON.stringify({ descripcion: alerta.descripcion }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getAlertas = () =>
  fetch(`${API_URL}/alerta`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const updateEmbarcacion = (embarcacion: Embarcacion) =>
  fetch(`${API_URL}/embarcacion/${embarcacion.id}`, {
    method: 'PATCH',
    body: JSON.stringify(embarcacion),
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const deleteEmbarcacion = (id: string) =>
  fetch(`${API_URL}/embarcacion/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

export const getEmbarcacionById = (id: string) =>
  fetch(`${API_URL}/embarcacion/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  export const deleteAlerta = (id: string) =>
    fetch(`${API_URL}/alerta/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
