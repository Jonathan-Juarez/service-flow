import { useState } from "react";
import "./App.css";
import type { Vista } from "./types/navigation";
import { InicioView } from "./view/inicio-view";
import { RegistrarSolicitudView } from "./view/registrar-solicitud-view";
import { ConsultarSolicitudesView } from "./view/consultar-solicitudes-view";
import { SiteHeader } from "./core/components/site-header";

function App() {
  const [vista, setVista] = useState<Vista>("inicio");

  return (
    <div className="app-shell">
      <a className="skip-link" href="#contenido-principal">Saltar al contenido</a>
      <SiteHeader vistaActual={vista} toNavigate={setVista} />
      <main id="contenido-principal" className="page-content" tabIndex={-1}>
        {vista === "inicio" && <InicioView toNavigate={setVista} />}
        {vista === "registrar" && <RegistrarSolicitudView />}
        {vista === "consultar" && <ConsultarSolicitudesView />}
      </main>
    </div>
  );
}

export default App;