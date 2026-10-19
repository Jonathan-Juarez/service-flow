import type { SolicitudRepository } from "../core/solicitud-repository.js";
import type { Solicitud } from "../core/solicitud.js";

export class ListarSolicitudes {
    constructor(private readonly solicitudRepo: SolicitudRepository) { }

    async execute(): Promise<Solicitud[]> {
        const solicitudes = await this.solicitudRepo.listAll();
        if (solicitudes.length === 0) {
            throw new Error("No hay solicitudes registradas.");
        }
        return solicitudes;
    }
}