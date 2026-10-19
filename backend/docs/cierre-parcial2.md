# ServiceFlow · Segundo Parcial · Semana 1

Esta semana continúa desde el cierre esperado del Primer Parcial y construye una funcionalidad vertical completa: **asignar una solicitud registrada a una persona responsable**.

## Carpetas

- `serviceflow-inicio`: punto de partida correcto al cierre del Primer Parcial.
- `serviceflow-final`: resultado completo de la semana, listo para comparar o copiar por archivo.

## Recorrido funcional

1. Registrar una solicitud: `POST /api/solicitudes` → HTTP 201.
2. Listar solicitudes desde React.
3. Seleccionar una solicitud con estado `registrada`.
4. Escribir el responsable y confirmar.
5. Asignar: `PATCH /api/solicitudes/:folio/asignacion` → HTTP 200.
6. Ver `responsable` y el estado `en_atencion` en la misma tarjeta.
7. Repetir la asignación → HTTP 409.

## Archivos principales de la implementación

### Back-End

- `backend/src/domain/Solicitud.ts`: agrega `responsable` y `en_atencion`.
- `backend/src/domain/SolicitudRepository.ts`: agrega la operación `actualizar`.
- `backend/src/application/AsignarSolicitud.ts`: valida y ejecuta la asignación.
- `backend/src/infrastructure/InMemorySolicitudRepository.ts`: actualiza el elemento almacenado.
- `backend/src/interfaces/http/solicitudesRouter.ts`: publica el endpoint PATCH.
- `backend/src/server.ts`: conecta el nuevo caso de uso.
- `backend/scripts/demo-asignacion.mjs`: demuestra 201, 200 y 409.

### Front-End

- `frontend/src/app/App.tsx`: compone las vistas principales.
- `frontend/src/shared`: componentes y modelos compartidos.
- `frontend/src/features/solicitudes/models/solicitud.ts`: contrato TypeScript.
- `frontend/src/features/solicitudes/services/solicitudesApi.ts`: comunicación HTTP.
- `frontend/src/features/solicitudes/components/SolicitudCard.tsx`: presenta cada solicitud.
- `frontend/src/features/solicitudes/components/AsignarSolicitudForm.tsx`: estado, eventos y envío de la asignación.
- `frontend/src/features/solicitudes/views/SolicitudesView.tsx`: compone listado, selección y actualización.
- `frontend/src/app/App.css`: diseño del panel de asignación y tarjetas.

## Comandos

Desde `serviceflow-final`:

```powershell
npm run install:all
```

Terminal 1:

```powershell
npm run dev:backend
```

Terminal 2:

```powershell
npm run dev:frontend
```

Prueba repetible de la API, con el Back-End encendido:

```powershell
cd backend
npm run demo:asignacion
```

Comprobación técnica:

```powershell
cd backend
npm run check

cd ..\frontend
npm run build
```

## Resultado verificado

- Back-End TypeScript: correcto.
- Front-End TypeScript + Vite: correcto.
- Registro: HTTP 201.
- Asignación: HTTP 200.
- Segunda asignación: HTTP 409.

No se agrega React Router, autenticación ni persistencia real en esta semana. Esos contenidos corresponden a semanas posteriores de la Unidad 2.