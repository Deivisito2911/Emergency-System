export interface Incident {
    id: string;
    titulo: string;
    tipoIncendio: string;
    prioridad: string;
    magnitud: string;
    estatus: string;
    depBomberos: string;
    telefonoReportante?: string;
    nombreReportante?: string;
    notas?: string;
    latitud: number;
    longitud: number;
}

export interface Markers {
    id: string;
    tipoIncendio: string;
    latitud: number;
    longitud: number;
    icon?: string;
}