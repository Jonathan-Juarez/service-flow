## POST /api/solicitudes

Respuesta:Crea una solicitud.
Pruebaaaa

Entrada JSON: {
    "titulo": "string",
    "descripcion": "string",
    "prioridad": "baja" | "media" | "alta"
}

Salida de éxito 201 en JSON:
{
    "folio": "string",
    "titulo": "string",
    "descripcion": "string",
    "prioridad": "baja" | "media" | "alta",
    "estado": "registrada",
    "fechaRegistro": "string"
}

Salidad de error 400 en JSON:
{
    "message": "string"
}

Autenticación: No implementada en I1.




## GET /api/solicitudes/:folio

Éxito 200: solicitud encontrada

Error 404: {"message": "Solicitud no encontrada"}

## Limitaciones de I1

- Los datos se pierden al reiniciar el servidor.
- No existe autenticación ni autorización.
- No se implementan asiganción, atención o cirre.
