import { useEffect, useMemo, useState, type FormEvent } from "react";
import type { Prioridad, Solicitud } from "../types/solicitud";
import { consultarSolicitud, listarSolicitudes } from "../service/solicitudes";
import { StatusMessage } from "../core/components/status-message";
import { SolicitudCard } from "../core/components/solicitud-card";

type FiltroPrioridad = "todas" | Prioridad;

export function ConsultarSolicitudesView() {
    const [folio, setFolio] = useState("");
    const [consulta, setConsulta] = useState<Solicitud | null>(null);
    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [texto, setTexto] = useState("");
    const [prioridad, setPrioridad] = useState<FiltroPrioridad>("todas");
    const [mensaje, setMensaje] = useState("Cargando solicitudes...");
    const [tipoMensaje, setTipoMensaje] = useState<"informacion" | "exito" | "error">("informacion");

    useEffect(() => {
        async function cargar() {
            try {
                const datos = await listarSolicitudes();
                setSolicitudes(datos);
                setMensaje(datos.length ? "" : "Todavía no hay solicitudes registradas.");
            } catch (error) {
                setTipoMensaje("error");
                setMensaje(error instanceof Error ? error.message : "Error inesperado");
            }
        }

        void cargar();
    }, []);

    const solicitudesFiltradas = useMemo(() => {
        const busqueda = texto.trim().toLowerCase();
        return solicitudes.filter(solicitud => {
            const coincideTexto =
                !busqueda ||
                solicitud.folio.toLowerCase().includes(busqueda) ||
                solicitud.titulo.toLowerCase().includes(busqueda);
            const coincidePrioridad =
                prioridad === "todas" || solicitud.prioridad === prioridad;
            return coincideTexto && coincidePrioridad;
        });
    }, [solicitudes, texto, prioridad]);

    async function buscar(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setConsulta(null);

        if (!folio.trim()) {
            setTipoMensaje("error");
            setMensaje("Escribe un folio para realizar la consulta.");
            return;
        }

        setTipoMensaje("informacion");
        setMensaje("Consultando folio...");

        try {
            const encontrada = await consultarSolicitud(folio.trim().toUpperCase());
            setConsulta(encontrada);
            setTipoMensaje("exito");
            setMensaje(`Encontramos la solicitud ${encontrada.folio}.`);
        } catch (error) {
            setTipoMensaje("error");
            setMensaje(error instanceof Error ? error.message : "Error inesperado");
        }
    }

    return (
        <section aria-labelledby="solicitudes-titulo">
            <div className="section-heading split-heading">
                <div>
                    <span className="eyebrow">Seguimiento</span>
                    <h1 id="solicitudes-titulo">Solicitudes registradas</h1>
                </div>
                <p>Consulta un folio exacto o filtra el listado disponible.</p>
            </div>

            <form className="search-card" onSubmit={buscar} noValidate>
                <div className="field-group">
                    <label htmlFor="folio">Consulta por folio</label>
                    <input
                        id="folio"
                        value={folio}
                        onChange={event => setFolio(event.target.value)}
                        placeholder="SF-001"
                    />
                </div>
                <button className="primary-button" type="submit">Consultar</button>
            </form>

            <StatusMessage message={mensaje} tipo={tipoMensaje} />
            {consulta && <SolicitudCard solicitud={consulta} />}

            <div className="list-toolbar">
                <div className="field-group">
                    <label htmlFor="filtro-texto">Filtrar por folio o título</label>
                    <input
                        id="filtro-texto"
                        value={texto}
                        onChange={event => setTexto(event.target.value)}
                        placeholder="Ej. proyector"
                    />
                </div>
                <div className="field-group">
                    <label htmlFor="filtro-prioridad">Prioridad</label>
                    <select
                        id="filtro-prioridad"
                        value={prioridad}
                        onChange={event => setPrioridad(event.target.value as FiltroPrioridad)}
                    >
                        <option value="todas">Todas</option>
                        <option value="baja">Baja</option>
                        <option value="media">Media</option>
                        <option value="alta">Alta</option>
                    </select>
                </div>
                <strong className="result-count">{solicitudesFiltradas.length} resultado(s)</strong>
            </div>

            <div className="request-grid">
                {solicitudesFiltradas.map(solicitud => (
                    <SolicitudCard key={solicitud.folio} solicitud={solicitud} />
                ))}
            </div>
        </section>
    );
}