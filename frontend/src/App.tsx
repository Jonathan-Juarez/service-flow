import { useState, type FormEvent } from "react";

type SolicitudCreada = {
  folio: string;
  titulo: string;
  descripcion: string;
  prioridad: "baja" | "media" | "alta";
  estado: "registrada";
  fechaRegistro: string;
}

async function registrarSolicitud(titulo: string, descripcion: string) {
  const res = await fetch("http://localhost:3000/api/solicitudes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ titulo, descripcion, prioridad: "media" })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message ?? "No fue posible registrar la solicitud.");

  return data as SolicitudCreada;
}



function App() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [resultado, setResultado] = useState("");

  async function enviar(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); // Previene que la página se recargue.
    try {
      const solicitud = await registrarSolicitud(titulo, descripcion);
      setResultado("Folio: " + solicitud.folio);
    } catch (error) {
      setResultado(error instanceof Error ? error.message : "Error inesperado");
    }

  }
  return (
    <main>
      <h1>Mis depósitos</h1>

      <p>Aquí se mostrarán mis depósitos.</p>

      <h1>Crear Solicitud</h1>

      <form onSubmit={enviar}>
        <label htmlFor="titulo">Título</label>
        <input id="titulo" value={titulo} onChange={event => setTitulo(event.target.value)} />

        <label htmlFor="descripcion">Descripción</label>
        <textarea id="descripcion" value={descripcion} onChange={event => setDescripcion(event.target.value)} />

        <button type="submit">Registrar Solicitud</button>
      </form>
      {resultado && <p role="status">{resultado}</p>}
    </main>
  )
}

export default App