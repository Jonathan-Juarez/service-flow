interface Props {
    message: string;
    tipo: "informacion" | "exito" | "error";
}

export function StatusMessage({ message, tipo }: Props) {
    if (!message) return null;

    return (
        <p className={`status-message status-${tipo}`} role={tipo === "error" ? "alert" : "status"}>
            {message}
        </p>
    )
}