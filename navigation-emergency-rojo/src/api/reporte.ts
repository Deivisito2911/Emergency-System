import { API_URL } from '../../config/API_URL';

export interface Embarcacion {
    id: string;
    nombre: string;
}

export interface Alerta {
    id: string;
    descripcion: string;
}

export interface Reporte {
  id: string;
}

export const getEmbarcaciones = () =>
  fetch(`${API_URL}/embarcacion`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const getAlertaByEmbarcacionId = (embarcacionId: string) =>
  fetch(`${API_URL}/alerta/embarcacion/${embarcacionId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

export const createReporteRequest = (reporte: { fecha_reporte: string, tipo_emergencia: string, latitud: string, longitud: string, descripcion: string, embarcacionId: string, alertaId: string }) =>
  fetch(`${API_URL}/reporte`, {
    method: 'POST',
    body: JSON.stringify(reporte),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  export const getReportes = () =>
    fetch(`${API_URL}/reporte`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    export const updateReporte = (reporte: Reporte) =>
      fetch(`${API_URL}/reporte/${reporte.id}`, {
        method: 'PATCH',
        body: JSON.stringify(reporte),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
    export const deleteReporte = (id: string) =>
      fetch(`${API_URL}/reporte/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
    export const getReporteById = (id: string) =>
      fetch(`${API_URL}/reporte/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
