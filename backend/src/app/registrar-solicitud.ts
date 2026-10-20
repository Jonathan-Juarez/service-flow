import type { SolicitudRepository } from "../core/solicitud-repository.js";
import type { Solicitud, NuevaSolicitud } from "../core/solicitud.js";

export class RegistrarSolicitud {
    constructor(
        private readonly solicitudRepo: SolicitudRepository,
        private readonly now: () => Date = () => new Date()) { }

    async execute(solicitud: NuevaSolicitud): Promise<Solicitud> {
        const titulo = solicitud.titulo.trim();
        const descripcion = solicitud.descripcion.trim();

        if (!titulo || !descripcion) {
            throw new Error("Titulo y descripcion son obligatorios.");
        }

        const existentes = await this.solicitudRepo.listAll();



        const nuevaSolicitud: Solicitud = {
            folio: `SF-${existentes.length + 1}`.padStart(3, "0"),
            titulo,
            descripcion,
            prioridad: solicitud.prioridad ?? "media",
            estado: "registrada",
            fechaRegistro: this.now().toISOString()
        };
        await this.solicitudRepo.save(nuevaSolicitud);
        return nuevaSolicitud;
    }
}