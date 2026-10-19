import type { Solicitud, NuevaSolicitud } from "./solicitud.js";

export interface SolicitudRepository {
    save(solicitud: NuevaSolicitud): Promise<void>;
    findByFolio(folio: string): Promise<Solicitud | null>;
    listAll(): Promise<Solicitud[]>;
}