import express from "express";
import cors from "cors";



type Prioridad = "baja" | "media" | "alta";

// Se crea un contrato de datos para una solicitud.
type Solicitud = {
    folio: string;
    titulo: string;
    descripcion: string;
    estado: "registrada";
    prioridad: Prioridad;
    fechaRegistro: string;
};

const solicitudes: Solicitud[] = [];

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK", service: "AquaSteward API" });
});

app.post("/api/solicitudes", (req, res) => {
    const { titulo, descripcion, prioridad } = req.body;
    if (!titulo || !descripcion) {
        return res.status(400).json({ message: "Título y descripción son obligatorios" });
    }

    const solicitud: Solicitud = {
        folio: "SF-" + String(solicitudes.length + 1),
        titulo: titulo.trim(),
        descripcion: descripcion.trim(),
        prioridad: prioridad ?? "media",
        estado: "registrada",
        fechaRegistro: new Date().toString()
    };

    solicitudes.push(solicitud);
    return res.status(201).json(solicitud);
});

app.get("/api/solicitudes", (req, res) => {
    if (!solicitudes) {
        return res.status(404).json({ message: "No hay solicitudes registradas" });
    };
    return res.status(200).json(solicitudes);
});

app.get("/api/solicitudes/:folio", (req, res) => {
    const solicitud = solicitudes.find(solicitud => solicitud.folio == req.params.folio);
    if (!solicitud) {
        return res.status(404).json({ message: "Solicitud no encontrada" });
    };
    return res.status(200).json(solicitud);
});

fetch("http://localhost:3000/api/solicitudes", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        titulo: "Proyector sin imagen",
        descripcion: "Aula Laboratorio de Ingeniería de Software",
        prioridad: "alta",
    }),
}).then(async res => {
    console.log(res.status, await res.json());
});

app.listen(3000, () => {
    console.log("AquaSteward API: http://localhost:3000");
});