import { useState, type FormEvent } from "react";
import "./App.css";

type Vista = "inicio" | "registrar" | "consultar";

const API_URL = "http://localhost:3000/api/solicitudes";

type Solicitud = {
  folio: string;
  titulo: string;
  descripcion: string;
  prioridad: "baja" | "media" | "alta";
  estado: "registrada";
  fechaRegistro: string;
}

async function registrarSolicitud(titulo: string, descripcion: string) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo, descripcion, prioridad: "media" })
  });

  return leerRespuesta(res);
}

async function leerRespuesta(res: Response) {
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "No fue posible obtener la respuesta.");
  return data as Solicitud;
}

async function consultarSolicitud(folio: string) {
  const res = await fetch(`${API_URL}/${encodeURIComponent(folio)}`);
  return leerRespuesta(res);
}


function App() {
  const [vista, setVista] = useState<Vista>("inicio");
  const [folio, setFolio] = useState("")
  const [solicitud, setSolicitud] = useState<Solicitud | null>(null);
  const [resultadoConsulta, setResultadoConsulta] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [resultado, setResultado] = useState("");

  async function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Previene que la página se recargue.
    setResultado("Registrando...")
    try {
      const solicitud = await registrarSolicitud(titulo, descripcion);
      setResultado("Folio: " + solicitud.folio);
    } catch (error) {
      setResultado(error instanceof Error ? error.message : "Error inesperado");
    }

  }
  async function buscar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSolicitud(null);
    setResultado("Consultando...");
    try {
      const data = await consultarSolicitud(folio);
      setSolicitud(data);
      setResultado("");
    } catch (error) {
      setResultado(error instanceof Error ? error.message : "Error al consultar solicitud.");
      console.error(error);
    }
  }
  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand" type="button" onClick={() => setVista("inicio")}>AquaSteward</button>

        <nav aria-label="Navegación principal">
          <button className={vista === "inicio" ? "activo" : ""} type="button" onClick={() => setVista("inicio")}>Inicio</button>
          <button className={vista === "registrar" ? "activo" : ""} type="button" onClick={() => setVista("registrar")}>Registrar</button>
          <button className={vista === "consultar" ? "activo" : ""} type="button" onClick={() => setVista("consultar")}>Consultar</button>
        </nav>

      </header>

      <main className="page-content">
        {vista === "inicio" && (
          <section className="home-view">
            <span className="eyebrow">
              Gestión de Servicios
            </span>
            <h1>Solicitudes de servicio en un solo lugar</h1>
            <p>Registra una nueva solictud o consulta el estado mediante su folio</p>
            <div className="home-action">
              <button className="primary-button" type="button" onClick={() => setVista("registrar")} >Nueva solicitud</button>
              <button className="secondary-button" type="button" onClick={() => setVista("consultar")} >Consultar folio</button>
            </div>
          </section>
        )}

        {vista === "registrar" && (
          <section>
            <div className="form-header">
              <span className="eyebrow">Nueva Solicitud</span>
              <h1>Registrar nueva solicitud</h1>
              <p>Describe el servicio requerido. Al terminar recibirás un folio.</p>
            </div>
            <div className="content-grid">
              <form className="form-card" onSubmit={enviar} noValidate>
                <label htmlFor="titulo">Título</label>
                <input id="titulo" value={titulo} onChange={event => setTitulo(event.target.value)} placeholder="Ej. Falla bomba de agua" />

                <label htmlFor="descripcion">Descripción</label>
                <textarea id="descripcion" value={descripcion} onChange={event => setDescripcion(event.target.value)} placeholder="Indicar qué ocurre y dónde." />

                <button className="primary-button" type="submit">Registrar Solicitud</button>
              </form>

              <aside className="result-card" aria-live="polite">
                <span className="eyebrow">Resultado</span>
                <h2>Respuesta del servidor</h2>
                <p>{resultado || "Aún no hay respuesta."}</p>
                {resultado.startsWith("Folio:") && (
                  <button className="secondary-button" type="button" onClick={() => setVista("consultar")}>Consultar este folio</button>
                )}
              </aside>
            </div>
          </section>
        )}

        {vista === "consultar" && (
          <section>
            <div className="section-heading">
              <span className="eyebrow">
                Consultar  Solicitud
              </span>
              <h1>Consulta el estado de una solicitud</h1>
              <p>Indica el folio y conoce su estado actual.</p>
              <div>
                <form className="form-card" onSubmit={buscar} noValidate>
                  <div>
                    <label htmlFor="folio">Folio</label>
                    <input id="folio" value={folio} onChange={event => setFolio(event.target.value)} placeholder="SF-1" />
                  </div>
                  <button className="primary-button" type="submit">Consultar Solicitud</button>
                </form>
                {resultado && <div className="query-result" aria-live="polite">{resultado}</div>}
                {solicitud && (
                  <article className="request-card">
                    <div><span>Folio<strong>{solicitud.folio}</strong></span></div>
                    <div><span>Estado<strong>{solicitud.estado}</strong></span></div>
                    <h2>{solicitud.titulo}</h2>
                    <p>{solicitud.descripcion}</p>
                  </article>
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>


  )
}

export default App