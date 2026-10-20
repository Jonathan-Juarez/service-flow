import type { SolicitudRepository } from "../core/solicitud-repository.js";
import type { Solicitud } from "../core/solicitud.js";

export class InMemorySolicitudRepository implements SolicitudRepository {
    // readonly significa que no se puede modificar.
    private readonly solicitudes: Solicitud[] = [];

    async save(solicitud: Solicitud): Promise<void> {
        this.solicitudes.push(solicitud);
    }
    async findByFolio(folio: string): Promise<Solicitud | null> {
        return this.solicitudes.find(solicitud => solicitud.folio === folio) ?? null;
    }
    async listAll(): Promise<Solicitud[]> {
        return [...this.solicitudes];
    }
}