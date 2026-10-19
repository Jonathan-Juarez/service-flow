import { useState, type FormEvent } from "react";
import type { Prioridad } from "../types/solicitud";
import { registrarSolicitud } from "../service/solicitudes";
import { StatusMessage } from "../core/components/status-message";

export function RegistrarSolicitudView() {
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [prioridad, setPrioridad] = useState<Prioridad>("media");
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState<"informacion" | "exito" | "error">("informacion");
    const [enviando, setEnviando] = useState(false);

    async function enviar(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!titulo.trim() || !descripcion.trim()) {
            setTipoMensaje("error");
            setMensaje("Escribe el título y la descripción antes de continuar.");
            return;
        }

        setEnviando(true);
        setTipoMensaje("informacion");
        setMensaje("Registrando solicitud...");

        try {
            const solicitud = await registrarSolicitud({ titulo, descripcion, prioridad });
            setTipoMensaje("exito");
            setMensaje(`Solicitud registrada. Conserva el folio ${solicitud.folio}.`);
            setTitulo("");
            setDescripcion("");
            setPrioridad("media");
        } catch (error) {
            setTipoMensaje("error");
            setMensaje(error instanceof Error ? error.message : "Error inesperado");
        } finally {
            setEnviando(false);
        }
    }

    return (
        <section aria-labelledby="registro-titulo">
            <div className="section-heading">
                <span className="eyebrow">Nueva solicitud</span>
                <h1 id="registro-titulo">Cuéntanos qué necesitas.</h1>
                <p>Describe el servicio con datos claros. El sistema generará un folio.</p>
            </div>

            <div className="content-grid">
                <form className="form-card" onSubmit={enviar} noValidate>
                    <div className="field-group">
                        <label htmlFor="titulo">Título</label>
                        <input
                            id="titulo"
                            name="titulo"
                            value={titulo}
                            onChange={event => setTitulo(event.target.value)}
                            placeholder="Ej. Falla en el proyector"
                            aria-describedby="titulo-ayuda"
                        />
                        <small id="titulo-ayuda">Resume el problema en una línea.</small>
                    </div>

                    <div className="field-group">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            rows={6}
                            value={descripcion}
                            onChange={event => setDescripcion(event.target.value)}
                            placeholder="Indica qué ocurre, dónde y desde cuándo."
                            aria-describedby="descripcion-ayuda"
                        />
                        <small id="descripcion-ayuda">Incluye datos que ayuden a atenderla.</small>
                    </div>

                    <div className="field-group">
                        <label htmlFor="prioridad">Prioridad</label>
                        <select
                            id="prioridad"
                            name="prioridad"
                            value={prioridad}
                            onChange={event => setPrioridad(event.target.value as Prioridad)}
                        >
                            <option value="baja">Baja</option>
                            <option value="media">Media</option>
                            <option value="alta">Alta</option>
                        </select>
                    </div>

                    <button className="primary-button" type="submit" disabled={enviando}>
                        {enviando ? "Registrando..." : "Registrar solicitud"}
                    </button>
                </form>

                <aside className="result-panel">
                    <span className="eyebrow">Respuesta</span>
                    <h2>El folio conecta el registro con la consulta.</h2>
                    <p>Prueba un registro válido y después envía el formulario vacío.</p>
                    <StatusMessage message={mensaje} tipo={tipoMensaje} />
                </aside>
            </div>
        </section>
    );
}