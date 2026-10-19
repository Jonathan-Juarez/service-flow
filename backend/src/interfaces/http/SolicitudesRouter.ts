import { Router, type Request } from "express";
import type { ConsultarSolicitud } from "../../app/consultar-solicitud.js";
import type { ListarSolicitudes } from "../../app/listar-solicitudes.js";
import type { RegistrarSolicitud } from "../../app/registrar-solicitud.js";
import type { NuevaSolicitud } from "../../core/solicitud.js";

interface Dependencias {
    registrarSolicitud: RegistrarSolicitud,
    listarSolicitudes: ListarSolicitudes,
    consultarSolicitud: ConsultarSolicitud
}

export function crearSolicitudRouter(dependencias: Dependencias): Router {
    const router = Router();

    router.get("/", async (_req, res) => {
        const solicitudes = await dependencias.listarSolicitudes.execute();
        return res.status(200).json(solicitudes);
    });

    router.post("/", async (req: Request<object, object, NuevaSolicitud>, res) => {
        try {
            const solicitud = await dependencias.registrarSolicitud.execute(req.body);
            return res.status(201).json(solicitud);

        } catch (error) {
            const message = error instanceof Error ? error.message : "Datos inválidos";
            return res.status(400).json({ message });
        }
    });

    router.get("/:folio", async (req, res) => {
        try {
            const solicitud = await dependencias.consultarSolicitud.execute(req.params.folio);
            return res.status(200).json(solicitud);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Solicitud no encontrada";
            return res.status(404).json({ message });
        }
    });

    return router;
}