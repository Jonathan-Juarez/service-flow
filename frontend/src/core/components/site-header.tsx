import type { Vista } from "../../types/navigation";

interface Props {
    vistaActual: Vista;
    toNavigate: (vista: Vista) => void;
}

const options: Array<{ vista: Vista; etiqueta: string }> = [
    { vista: "inicio", etiqueta: "Inicio" },
    { vista: "registrar", etiqueta: "Registrar" },
    { vista: "consultar", etiqueta: "Consultar" },
];

export function SiteHeader({ vistaActual, toNavigate }: Props) {
    return (
        <header className="site-header">
            <button className="brand" type="button" onClick={() => toNavigate("inicio")}>
                <span>AquaSteward</span>
            </button>
            <nav>
                {options.map(({ vista, etiqueta }) => (
                    <button key={vista} type="button" className={vistaActual === vista ? "activo" : ""} onClick={() => toNavigate(vista)}>
                        {etiqueta}
                    </button>
                ))}
            </nav>
        </header>
    )
}