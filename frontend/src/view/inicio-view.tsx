import heroImage from "../assets/hero.png";
import type { Vista } from "../types/navigation";

interface Props {
    toNavigate: (vista: Vista) => void;
}

export function InicioView({ toNavigate }: Props) {
    return (
        <section className="home-view" aria-labelledby="inicio-titulo">
            <div className="home-copy">
                <span className="eyebrow">Gestión de servicios</span>
                <h1 id="inicio-titulo">Cada solicitud, visible de principio a fin.</h1>
                <p>
                    Registra una necesidad, conserva su folio y consulta la información
                    desde un solo lugar.
                </p>
                <div className="home-actions">
                    <button
                        className="primary-button"
                        type="button"
                        onClick={() => toNavigate("registrar")}
                    >
                        Registrar solicitud
                    </button>
                    <button
                        className="secondary-button"
                        type="button"
                        onClick={() => toNavigate("consultar")}
                    >
                        Ver solicitudes
                    </button>
                </div>
                <ul className="feature-list" aria-label="Capacidades disponibles">
                    <li>Registro con folio</li>
                    <li>Consulta inmediata</li>
                    <li>Diseño adaptable</li>
                </ul>
            </div>
            <div className="home-visual" aria-hidden="true">
                <div className="hero-orbit"></div>
                <img src={heroImage} alt="" />
                <div className="floating-ticket">
                    <span>Último registro</span>
                    <strong>SF-003</strong>
                    <small>Prioridad alta</small>
                </div>
            </div>
        </section>
    );
}