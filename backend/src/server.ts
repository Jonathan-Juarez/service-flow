// import "dotenv/config";
// import express from "express";
// import cors from "cors";



// type Prioridad = "baja" | "media" | "alta";

// // Se crea un contrato de datos para una solicitud.
// type Solicitud = {
//     folio: string;
//     titulo: string;
//     descripcion: string;
//     estado: "registrada";
//     prioridad: Prioridad;
//     fechaRegistro: string;
// };

// const solicitudes: Solicitud[] = [];

// const PORT = Number(process.env.PORT) || 3000;

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.get("/api/health", (req, res) => {
//     res.status(200).json({ status: "OK", service: "AquaSteward API" });
// });

// app.post("/api/solicitudes", (req, res) => {
//     const { titulo, descripcion, prioridad } = req.body;
//     if (!titulo || !descripcion) {
//         return res.status(400).json({ message: "Título y descripción son obligatorios" });
//     }

//     const solicitud: Solicitud = {
//         folio: "SF-" + String(solicitudes.length + 1),
//         titulo: titulo.trim(),
//         descripcion: descripcion.trim(),
//         prioridad: prioridad ?? "media",
//         estado: "registrada",
//         fechaRegistro: new Date().toString()
//     };

//     solicitudes.push(solicitud);
//     return res.status(201).json(solicitud);
// });

// app.get("/api/solicitudes", (req, res) => {
//     if (!solicitudes) {
//         return res.status(404).json({ message: "No hay solicitudes registradas" });
//     };
//     return res.status(200).json(solicitudes);
// });

// app.get("/api/solicitudes/:folio", (req, res) => {
//     const solicitud = solicitudes.find(solicitud => solicitud.folio == req.params.folio);
//     if (!solicitud) {
//         return res.status(404).json({ message: "Solicitud no encontrada" });
//     };
//     return res.status(200).json(solicitud);
// });

// // fetch("http://localhost:3000/api/solicitudes", {
// //     method: "POST",
// //     headers: {
// //         "Content-Type": "application/json",
// //     },
// //     body: JSON.stringify({
// //         titulo: "Proyector sin imagen",
// //         descripcion: "Aula Laboratorio de Ingeniería de Software",
// //         prioridad: "alta",
// //     }),
// // }).then(async res => {
// //     console.log(res.status, await res.json());
// // });

// app.listen(PORT, () => {
//     console.log(`AquaSteward API: http://localhost:${PORT}`);
// });

import "dotenv/config";
import express from "express";
import cors from "cors";
import { InMemorySolicitudRepository } from "./infra/in-memory-Solicitud-repository.js";
import { crearSolicitudRouter } from "./interfaces/http/SolicitudesRouter.js";
import { RegistrarSolicitud } from "./app/registrar-solicitud.js";
import { ListarSolicitudes } from "./app/listar-solicitudes.js";
import { ConsultarSolicitud } from "./app/consultar-solicitud.js";

const PORT = Number(process.env.PORT) || 3000;
const repository = new InMemorySolicitudRepository();

const app = express();
app.use(cors());
app.use(express.json());


app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "AquaSteward API" });
});

app.use("/api/solicitudes", crearSolicitudRouter({
    registrarSolicitud: new RegistrarSolicitud(repository),
    listarSolicitudes: new ListarSolicitudes(repository),
    consultarSolicitud: new ConsultarSolicitud(repository)
}));

app.listen(PORT, () => {
    console.log(`AquaSteward API: http://localhost:${PORT}`);
});