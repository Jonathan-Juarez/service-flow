import type { NuevaSolicitud, Solicitud } from "../types/solicitud";

// meta.env accede a las variables de entorno del archivo .env
export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api/solicitudes";

export interface ErrorApi {
    message: string;
}

// Función genérica para manejar la respuesta del servidor.
async function leerRepuesta<T>(res: Response): Promise<T> {
    const data = await res.json();
    if (!res.ok) throw new Error((data as ErrorApi).message ?? "No fue posible obtener la respuesta.");
    return data as T;
}

// Función para registrar una nueva solicitud.
export async function registrarSolicitud(data: NuevaSolicitud): Promise<Solicitud> {
    const res = await fetch(`${API_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return leerRepuesta<Solicitud>(res);
}

// Función para consultar una solicitud por folio.
export async function consultarSolicitud(folio: string): Promise<Solicitud> {
    // encodeURIComponent se asegura que el folio se codifique correctamente.
    const res = await fetch(`${API_URL}/${encodeURIComponent(folio)}`);
    return leerRepuesta<Solicitud>(res);
}

// Función para listar todas las solicitudes.
export async function listarSolicitudes(): Promise<Solicitud[]> {
    const res = await fetch(`${API_URL}`);
    return leerRepuesta<Solicitud[]>(res);
}