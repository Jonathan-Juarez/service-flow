# Diagnóstico para iniciar el Segundo Parcial

Fecha de revisión: 27 de septiembre de 2026.

## Punto de partida curricular

- Desarrollo de Aplicaciones Web, Unidad 2, Semana 1: componentes funcionales, JSX, propiedades, estado, eventos, composición y organización del Front-End.
- Construcción de Software, Semana 7: funcionalidad vertical, integración frecuente y criterios de aceptación.
- Guía semestral, Semana 7: ficha de una capacidad extremo a extremo; el ejemplo oficial es **asignar solicitud**.

## Cierre esperado del Primer Parcial

ServiceFlow debe registrar, consultar y listar solicitudes mediante un Back-End organizado en dominio, aplicación, infraestructura e interfaz HTTP, y un Front-End React/TypeScript con componentes, vistas, servicios y estilos responsivos.

La referencia corregida se conserva en:

`materiales/construccion-desarrollo-software/cierre-primer-parcial-codigo/serviceflow-final`

## Estado observado en `C:\serviceflow`

- La rama activa es `feature/cierre-primer-parcial`.
- Existen cambios modificados y carpetas nuevas todavía sin consolidar.
- El Back-End ya intenta separar capas, pero conserva nombres inconsistentes como `ResgistrarSolicitud`, `ListarSolicitud`, `Infraestructure` y variantes de mayúsculas.
- El Front-End visible todavía concentra gran parte del comportamiento en `App.tsx`.
- Hay archivos nuevos de componentes, servicios y tipos, pero el recorrido modular del cierre aún no está completamente aplicado.

Por esa razón, la nueva semana no toma `C:\serviceflow` como una línea base ya consolidada. La carpeta `serviceflow-inicio` del paquete semanal contiene el estado correcto que debe comprobarse antes de implementar la asignación.

## Decisión para la semana

La funcionalidad vertical será:

> Como personal de atención, quiero asignar una solicitud registrada a una persona responsable para que su atención tenga dueño y el estado cambie a “En atención”.

Criterios de aceptación:

1. Una solicitud registrada y un responsable válido producen HTTP 200.
2. La respuesta contiene el responsable y el estado `en_atencion`.
3. Una segunda asignación produce HTTP 409.
4. El Front-End actualiza la tarjeta sin recargar la página.
5. La estructura distingue `app`, `shared` y `features/solicitudes`.