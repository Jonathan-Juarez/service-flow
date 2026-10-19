export type Prioridad = "baja" | "media" | "alta";

export type Estado = "registrada";

export interface Solicitud {
    folio: string;
    titulo: string;
    descripcion: string;
    prioridad: Prioridad;
    estado: Estado;
    fechaRegistro: string;
}

export interface NuevaSolicitud {
    titulo: string;
    descripcion: string;
    prioridad?: Prioridad;
}
