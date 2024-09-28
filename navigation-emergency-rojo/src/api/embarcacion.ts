import {API_URL} from '../../config/API_URL';
interface Embarcacion {
    nombre: string,
    tipo_embarcacion: string,
    tipo_material: string,
    capacidad_maxima: string,
    peso_embarcacion: string,
    fecha_fabricacion: string,
    cantidad_motor: string
}

export const createEmbarcacionRequest = (embarcacion: Embarcacion) =>
    fetch(`${API_URL}/embarcacion`, {
        method: 'POST',
        body: JSON.stringify(embarcacion),
        headers: {
            'Content-Type': 'application/json'
        }
    })
