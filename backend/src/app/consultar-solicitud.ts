import type { SolicitudRepository } from "../core/solicitud-repository.js";
import type { Solicitud } from "../core/solicitud.js";

export class ConsultarSolicitud {
    constructor(private readonly solicitudRepo: SolicitudRepository) { }

    async execute(folio: string): Promise<Solicitud | null> {
        const solicitud = await this.solicitudRepo.findByFolio(folio.trim().toUpperCase());
        if (!solicitud) {
            throw new Error("Solicitud no encontrada.");
        }
        return solicitud;
    }
}