import axios from 'axios';
import { Incident, Markers } from '../types';

const ENDPOINT_BASE_URL = import.meta.env.VITE_FIRE_INCIDENTS_ENDPOINT_HOST;

export const sendFireIncidentReport = async (incidentData: any) => {
    try {
        const response = await fetch(`${ENDPOINT_BASE_URL}/fire-incidents/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(incidentData)
        });

        if (!response.ok) {
            const errorDetails = await response.json();
            console.error('Error en la respuesta del servidor:', errorDetails);
            throw new Error(`Error al enviar el reporte de incendio: ${errorDetails.message}`);
        }

        const result = await response.json();
        return result;
    } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        console.error('Error al enviar el formulario:', errorMessage);
        throw new Error(errorMessage);
    }
};

export const getIncidents = async () => {
    try {
        const response = await axios.get<Incident[]>(`${ENDPOINT_BASE_URL}/fire-incidents/`);
        return response.data;
    } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        console.error('Error obteniendo los incidentes:', errorMessage);
        throw new Error(errorMessage);
    }
};

export const getMarkers = async () => {
    try {
        const response = await axios.get<Markers[]>(`${ENDPOINT_BASE_URL}/fire-incidents/markers/`);
        return response.data;
    } catch (error: unknown) {
        const errorMessage = (error as Error).message;
        console.error('Error obteniendo los incidentes:', errorMessage);
        throw new Error(errorMessage);
    }
};
