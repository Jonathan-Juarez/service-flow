import type { Solicitud } from "../../types/solicitud";

interface SolicitudCardProps {
    solicitud: Solicitud;
}
export function SolicitudCard({ solicitud }: SolicitudCardProps) {
    return (
        <article className="request-card">
            <div className="request-card-topline">
                <strong>{solicitud.folio}</strong>
                <span className={`priority-badge priority-${solicitud.prioridad}`}>
                    {solicitud.prioridad}
                </span>
            </div>
            <h3>{solicitud.titulo}</h3>
            <p>{solicitud.descripcion}</p>
            <footer>
                <span>{solicitud.estado}</span>
                <time dateTime={solicitud.fechaRegistro}>
                    {new Date(solicitud.fechaRegistro).toLocaleString("es-MX")}
                </time>
            </footer>
        </article>
    )
}