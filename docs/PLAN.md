# Plan de Trabajo — Page Generator

## Resumen de Fases

| Fase      | Nombre                       | Historias | Tareas  | Complejidad |                                                       Estado                                                        |
| --------- | ---------------------------- | :-------: | :-----: | :---------: | :-----------------------------------------------------------------------------------------------------------------: |
| F0        | Fundacion y Arquitectura     |     1     |    8    |    Media    |                                                    ✅ Completada                                                    |
| F1        | Core — Gestion de Eventos    |     4     |   27    |    Alta     | ✅ Completada (HU-001 90%, HU-002 85%, HU-003 ✅, HU-004 ✅) — T-001.3/T-001.4 diferidos, T-002.3/T-002.4 diferidos |
| F2        | Templates y Personalizacion  |     3     |   25    |  Muy Alta   |           ✅ Completada (HU-005 85%, HU-006 75%, HU-007 ✅) — T-005.2/T-006.4/T-006.5/T-006.7-9 diferidos           |
| F3        | Multimedia                   |     3     |   21    |    Alta     | ✅ Completada (HU-008 ✅, HU-009 90%, HU-010 70%) — diferidos: biblioteca musica, fade audio, upload video directo  |
| F4        | Pagina Publica de Invitacion |     4     |   27    |  Muy Alta   |                           ✅ Completada (HU-011 90%, HU-012 90%, HU-013 50%, HU-014 80%)                            |
| F5        | Compartir y Distribucion     |     2     |   12    |    Media    |               ✅ Completada (HU-015 95%, HU-016 90%) — diferidos: T-015.4 og:image generada dinamica                |
| F6        | Analytics y Gestion Avanzada |     2     |   10    |    Media    |                                                      Pendiente                                                      |
| F7        | Admin Panel                  |     1     |    5    |    Media    |                                                      Pendiente                                                      |
| F8        | Monetizacion (Futuro)        |     1     |    4    |    Media    |                                                      Pendiente                                                      |
| **TOTAL** |                              |  **21**   | **139** |             |                                                                                                                     |

## Progreso General

- **Tareas completadas:** ~125 de 139
- **Porcentaje:** ~90%
- **Fase actual:** F5 CERRADA. MVP COMPLETO (F0-F5). Siguiente: F6 (Analytics, post-MVP)
- **Diferidos F5:** T-015.4 (og:image generada dinamicamente con Satori)
- **Diferidos F4:** Lighthouse optimization, favicon dinamico, service worker, Mapbox, CSV export, notificaciones RSVP
- **Diferidos de F1:** T-001.3 (recuperar contrasena), T-001.4 (login Google), T-002.3 (filtros), T-002.4 (busqueda)
- **Diferidos de F2:** T-005.2 (template engine layouts), T-006.4/5 (tamanos/layout), T-006.7-9 (preview movil/presets/reset)
- **Infra:** Docker multi-stage + GitHub Actions CI/CD + Dokploy deploy configurado

## MVP Minimo Viable

Fases 0 a 5 componen el MVP:

- Login y dashboard
- Crear eventos con campos dinamicos
- Elegir y customizar template
- Subir imagenes, musica, videos
- Pagina publica responsive con animaciones
- Compartir por WhatsApp con preview

Fases 6, 7 y 8 son post-MVP.

## Dependencias entre Fases

```
F0 (Setup)
  +---> F1 (Core)
        +---> F2 (Templates)
        |     +---> F4 (Pagina Publica)
        |           +---> F5 (Compartir)
        |                 +---> F6 (Analytics)
        +---> F3 (Multimedia) ---> F4
        +---> F7 (Admin)
              +---> F8 (Monetizacion)
```

---

## FASE 0: Fundacion y Arquitectura

### HU-000: Setup del Proyecto

**Como** desarrollador, **quiero** tener el proyecto configurado con la estructura base,
**para** poder empezar a desarrollar features.

| Tarea   | Descripcion                                                        | Estado |
| ------- | ------------------------------------------------------------------ | :----: |
| T-000.1 | Inicializar Astro 5 con React, TypeScript, Tailwind CSS 4          |  [x]   |
| T-000.2 | Configurar estructura de carpetas (screaming architecture)         |  [x]   |
| T-000.3 | Configurar linter (ESLint), formatter (Prettier), pre-commit hooks |  [x]   |
| T-000.4 | Configurar sistema de diseno base (tipografia, colores, spacing)   |  [x]   |
| T-000.5 | Configurar Drizzle ORM + conexion a PostgreSQL + migraciones       |  [x]   |
| T-000.6 | Definir modelo de datos inicial (ERD) y crear migraciones          |  [x]   |
| T-000.7 | Configurar Better Auth (auth base)                                 |  [x]   |
| T-000.8 | Configurar variables de entorno, S3 client, Resend client          |  [x]   |

---

## FASE 1: Core — Gestion de Eventos

### HU-001: Registro y Autenticacion

**Como** organizador, **quiero** registrarme e iniciar sesion,
**para** gestionar mis invitaciones.

| Tarea   | Descripcion                                  | Estado |
| ------- | -------------------------------------------- | :----: |
| T-001.1 | Implementar registro con email/password      |  [x]   |
| T-001.2 | Implementar login con JWT/sesiones           |  [x]   |
| T-001.3 | Implementar recuperacion de contrasena       |  [ ]   |
| T-001.4 | Implementar login social (Google) — opcional |  [ ]   |
| T-001.5 | Crear pantalla de login/registro responsive  |  [x]   |
| T-001.6 | Implementar proteccion de rutas (middleware) |  [x]   |

**Criterios de aceptacion:**

- El usuario puede registrarse, loguearse y recuperar contrasena
- Las rutas del dashboard estan protegidas
- Token se refresca automaticamente

---

### HU-002: Dashboard Principal

**Como** organizador, **quiero** ver un panel con todos mis eventos,
**para** gestionar mis invitaciones desde un solo lugar.

| Tarea   | Descripcion                                                         | Estado |
| ------- | ------------------------------------------------------------------- | :----: |
| T-002.1 | Disenar layout del dashboard (sidebar + content area)               |  [x]   |
| T-002.2 | Implementar listado de eventos (cards con preview)                  |  [x]   |
| T-002.3 | Implementar filtros por tipo de evento y estado                     |  [ ]   |
| T-002.4 | Implementar busqueda de eventos                                     |  [ ]   |
| T-002.5 | Mostrar estadisticas basicas (eventos activos, vistas, RSVPs)       |  [x]   |
| T-002.6 | Implementar acciones rapidas (editar, duplicar, archivar, eliminar) |  [x]   |
| T-002.7 | Responsive: adaptacion a tablet y mobile                            |  [x]   |

**Criterios de aceptacion:**

- El organizador ve todos sus eventos con preview thumbnail
- Puede filtrar, buscar y ejecutar acciones rapidas
- El dashboard es completamente responsive

---

### HU-003: Crear Nuevo Evento

**Como** organizador, **quiero** crear un evento seleccionando el tipo,
**para** empezar a configurar mi invitacion.

| Tarea   | Descripcion                                              | Estado |
| ------- | -------------------------------------------------------- | :----: |
| T-003.1 | Implementar wizard/stepper de creacion de evento         |  [x]   |
| T-003.2 | Paso 1: Seleccion de tipo de evento (cards visuales)     |  [x]   |
| T-003.3 | Paso 2: Datos basicos del evento (nombre, fecha, hora)   |  [x]   |
| T-003.4 | Paso 3: Seleccion de template/diseno                     |  [x]   |
| T-003.5 | Implementar modelo de datos de evento en backend         |  [x]   |
| T-003.6 | API endpoint para crear evento                           |  [x]   |
| T-003.7 | Validaciones de campos obligatorios segun tipo de evento |  [x]   |
| T-003.8 | Generar slug/URL unica para el evento                    |  [x]   |

**Criterios de aceptacion:**

- El wizard guia paso a paso al organizador
- Los campos obligatorios varian segun el tipo de evento
- Se genera una URL unica como: `libbagroup.com/e/boda-juan-y-maria`

---

### HU-004: Campos Dinamicos por Tipo de Evento

**Como** organizador, **quiero** que el formulario muestre los campos relevantes a mi tipo de evento,
**para** no perder tiempo con campos que no aplican.

| Tarea   | Descripcion                                                            | Estado |
| ------- | ---------------------------------------------------------------------- | :----: |
| T-004.1 | Definir schema de campos por tipo de evento (JSON/Zod)                 |  [x]   |
| T-004.2 | Implementar motor de formularios dinamicos                             |  [x]   |
| T-004.3 | Campos de Boda: novios, padrinos, ceremonia religiosa, mesa de regalos |  [x]   |
| T-004.4 | Campos de XV Anos: quinceaenra, chambelanes, padrinos, vals            |  [x]   |
| T-004.5 | Campos de Bautizo: bebe, padres, padrinos, iglesia                     |  [x]   |
| T-004.6 | Campos de Cumpleanos: festejado, edad, tematica                        |  [x]   |
| T-004.7 | Campos de Graduacion: graduado, institucion, carrera, acto             |  [x]   |
| T-004.8 | Validaciones especificas por tipo                                      |  [x]   |
| T-004.9 | Persistencia parcial (guardar progreso/borrador)                       |  [x]   |

**Criterios de aceptacion:**

- Cada tipo de evento muestra SOLO sus campos relevantes
- Los campos obligatorios se validan antes de publicar
- El progreso se guarda automaticamente como borrador

---

## FASE 2: Sistema de Templates y Personalizacion

### HU-005: Catalogo de Templates

**Como** organizador, **quiero** elegir entre disenos predeterminados,
**para** tener una base visual atractiva sin ser disenador.

| Tarea   | Descripcion                                                          | Estado |
| ------- | -------------------------------------------------------------------- | :----: |
| T-005.1 | Definir arquitectura de templates (como se almacenan/renderizan)     |  [x]   |
| T-005.2 | Crear sistema de template engine (renderizado dinamico)              |  [ ]   |
| T-005.3 | Disenar e implementar 2-3 templates por tipo de evento (10-15 total) |  [x]   |
| T-005.4 | Implementar galeria de templates con preview                         |  [x]   |
| T-005.5 | Implementar filtrado de templates por tipo de evento                 |  [x]   |
| T-005.6 | Preview del template con datos de ejemplo                            |  [ ]   |
| T-005.7 | Sistema de categorias/tags (elegante, moderno, minimalista, etc.)    |  [x]   |

**Criterios de aceptacion:**

- El organizador puede navegar y filtrar templates visualmente
- Cada template tiene un preview con datos de ejemplo
- Los templates estan categorizados por tipo de evento y estilo

---

### HU-006: Personalizacion Visual del Template

**Como** organizador, **quiero** personalizar colores, fuentes y estilos del template,
**para** que la invitacion refleje mi gusto personal.

| Tarea   | Descripcion                                                                | Estado |
| ------- | -------------------------------------------------------------------------- | :----: |
| T-006.1 | Implementar panel de personalizacion (sidebar derecho)                     |  [x]   |
| T-006.2 | Selector de paleta de colores (primario, secundario, acento, fondo, texto) |  [x]   |
| T-006.3 | Selector de tipografias (Google Fonts integration)                         |  [x]   |
| T-006.4 | Ajuste de tamanos de texto (headings, body)                                |  [ ]   |
| T-006.5 | Opciones de layout por seccion (centrado, lateral, full-width)             |  [ ]   |
| T-006.6 | Preview en vivo (split view: editor + preview)                             |  [x]   |
| T-006.7 | Opcion de preview en movil (iframe responsive)                             |  [ ]   |
| T-006.8 | Guardar configuracion visual como preset reutilizable                      |  [ ]   |
| T-006.9 | Reset a valores por defecto del template                                   |  [ ]   |

**Criterios de aceptacion:**

- Los cambios se ven en tiempo real en el preview
- El preview muestra como se vera en movil
- Se puede resetear al diseno original

---

### HU-007: Editor de Secciones/Bloques

**Como** organizador, **quiero** activar, desactivar y reordenar las secciones de mi invitacion,
**para** tener control total sobre el contenido.

| Tarea    | Descripcion                                                 | Estado |
| -------- | ----------------------------------------------------------- | :----: |
| T-007.1  | Implementar lista de secciones arrastrables (drag & drop)   |  [x]   |
| T-007.2  | Toggle de activar/desactivar por seccion                    |  [x]   |
| T-007.3  | Cada seccion expandible para editar su contenido            |  [x]   |
| T-007.4  | Seccion Hero: imagen principal, titulo, subtitulo           |  [x]   |
| T-007.5  | Seccion Countdown: seleccion de estilo de countdown         |  [x]   |
| T-007.6  | Seccion Ceremonia: lugar, direccion, hora, mapa embed       |  [x]   |
| T-007.7  | Seccion Recepcion: lugar, direccion, hora, mapa embed       |  [x]   |
| T-007.8  | Seccion Padrinos/Familia: nombre, foto, rol                 |  [x]   |
| T-007.9  | Seccion Galeria: upload multiple, reordenar, eliminar       |  [x]   |
| T-007.10 | Seccion Video: URL de YouTube/Vimeo o upload                |  [x]   |
| T-007.11 | Seccion Itinerario: timeline con hora + actividad           |  [x]   |
| T-007.12 | Seccion Dress Code: color swatches + texto                  |  [x]   |
| T-007.13 | Seccion Amenidades: nombre, foto, tipo (DJ, banda, etc.)    |  [x]   |
| T-007.14 | Seccion Mesa de Regalos: links + texto descriptivo          |  [x]   |
| T-007.15 | Seccion RSVP: formulario configurable                       |  [x]   |
| T-007.16 | Seccion Mensaje: rich text editor simple                    |  [x]   |
| T-007.17 | Preview actualizado en tiempo real con cambios de secciones |  [x]   |

**Criterios de aceptacion:**

- Las secciones se reordenan con drag & drop
- El preview refleja el orden y contenido en tiempo real
- Solo las secciones activas se muestran en el preview

---

## FASE 3: Multimedia

### HU-008: Gestion de Imagenes

**Como** organizador, **quiero** subir y gestionar las imagenes de mi invitacion,
**para** personalizar visualmente mi evento.

| Tarea   | Descripcion                                               | Estado |
| ------- | --------------------------------------------------------- | :----: |
| T-008.1 | Implementar upload de imagenes con drag & drop            |  [x]   |
| T-008.2 | Crop/resize de imagenes antes de subir                    |  [x]   |
| T-008.3 | Compresion automatica de imagenes (Sharp server-side)     |  [x]   |
| T-008.4 | Almacenamiento en S3 con URLs firmadas                    |  [x]   |
| T-008.5 | Galeria del evento (upload multiple, reordenar, eliminar) |  [x]   |
| T-008.6 | Lazy loading de imagenes en la invitacion publica         |  [x]   |
| T-008.7 | Formato WebP automatico para performance                  |  [x]   |
| T-008.8 | Limite de tamano y cantidad por evento                    |  [x]   |

**Criterios de aceptacion:**

- Las imagenes se comprimen y optimizan automaticamente
- La galeria soporta upload multiple y reordenamiento
- Las imagenes cargan con lazy loading en mobile

---

### HU-009: Musica de Fondo

**Como** organizador, **quiero** agregar musica de fondo a mi invitacion,
**para** crear una experiencia mas inmersiva.

| Tarea   | Descripcion                                                    | Estado |
| ------- | -------------------------------------------------------------- | :----: |
| T-009.1 | Implementar upload de archivos de audio (MP3, AAC)             |  [x]   |
| T-009.2 | Implementar reproductor flotante (play/pause/volumen)          |  [x]   |
| T-009.3 | Autoplay con gesto del usuario (cumplir politicas de browsers) |  [x]   |
| T-009.4 | Biblioteca de musica libre de derechos (opcional)              |  [ ]   |
| T-009.5 | Previsualizacion de audio en el editor                         |  [x]   |
| T-009.6 | Fade in/out al entrar a la pagina                              |  [ ]   |
| T-009.7 | Persistencia del estado de audio al scrollear                  |  [x]   |

**Criterios de aceptacion:**

- La musica se reproduce al primer toque/clic del usuario
- El control flotante esta siempre accesible
- Funciona correctamente en iOS Safari y Android Chrome

---

### HU-010: Videos

**Como** organizador, **quiero** incluir videos en mi invitacion,
**para** compartir momentos especiales.

| Tarea   | Descripcion                                     | Estado |
| ------- | ----------------------------------------------- | :----: |
| T-010.1 | Embed de videos de YouTube/Vimeo (URL paste)    |  [x]   |
| T-010.2 | Upload directo de video (con limite de tamano)  |  [ ]   |
| T-010.3 | Reproductor de video responsive                 |  [x]   |
| T-010.4 | Lazy loading de video (no cargar hasta visible) |  [x]   |
| T-010.5 | Thumbnail/poster del video                      |  [x]   |
| T-010.6 | Fallback si el video no carga                   |  [ ]   |

**Criterios de aceptacion:**

- Los videos se reproducen inline sin redirigir
- Videos embebidos y uploaded funcionan en mobile
- No afectan el performance de carga inicial

---

## FASE 4: Pagina Publica de Invitacion

### HU-011: Renderizado de Invitacion Publica

**Como** invitado, **quiero** ver la invitacion desde mi celular al abrir el link de WhatsApp,
**para** conocer los detalles del evento.

| Tarea    | Descripcion                                                          | Estado |
| -------- | -------------------------------------------------------------------- | :----: |
| T-011.1  | Motor de renderizado de pagina publica desde datos del evento        |  [x]   |
| T-011.2  | Renderizado de cada seccion/bloque segun template elegido            |  [x]   |
| T-011.3  | Responsive design mobile-first (320px hasta 1440px)                  |  [x]   |
| T-011.4  | Animaciones de entrada por seccion (scroll-triggered)                |  [x]   |
| T-011.5  | Smooth scrolling entre secciones                                     |  [x]   |
| T-011.6  | Performance: Lighthouse score > 90 en mobile                         |  [ ]   |
| T-011.7  | SEO basico: og:title, og:image, og:description para WhatsApp preview |  [x]   |
| T-011.8  | Favicon dinamico por evento                                          |  [ ]   |
| T-011.9  | Loading screen elegante mientras carga                               |  [x]   |
| T-011.10 | Soporte offline (Service Worker para assets cacheados)               |  [ ]   |
| T-011.11 | Manejo de 404 para URLs invalidas                                    |  [x]   |

**Criterios de aceptacion:**

- La invitacion carga en menos de 3 segundos en 3G
- El preview de WhatsApp muestra imagen, titulo y descripcion del evento
- Funciona en iOS Safari, Android Chrome, Samsung Internet
- Animaciones suaves sin jank en dispositivos de gama media

---

### HU-012: Cuenta Regresiva

**Como** invitado, **quiero** ver una cuenta regresiva hacia el evento,
**para** sentir la emocion de la espera.

| Tarea   | Descripcion                                                       | Estado |
| ------- | ----------------------------------------------------------------- | :----: |
| T-012.1 | Implementar componente countdown (dias, horas, minutos, segundos) |  [x]   |
| T-012.2 | 3 estilos de countdown (flip, circular, numerico)                 |  [x]   |
| T-012.3 | Mensaje post-evento cuando la cuenta llega a cero                 |  [x]   |
| T-012.4 | Animacion fluida del countdown                                    |  [x]   |
| T-012.5 | Timezone-aware (calcular basado en zona horaria del evento)       |  [ ]   |

**Criterios de aceptacion:**

- El countdown es preciso y timezone-aware
- Despues de la fecha muestra mensaje como "El evento ya llego!"

---

### HU-013: Mapa y Ubicacion

**Como** invitado, **quiero** ver la ubicacion del evento en un mapa interactivo,
**para** saber como llegar.

| Tarea   | Descripcion                                                 | Estado |
| ------- | ----------------------------------------------------------- | :----: |
| T-013.1 | Integracion con Mapbox GL JS (mapa interactivo con estilos) |  [ ]   |
| T-013.2 | Boton "Como llegar" (abre Google Maps/Waze/Apple Maps)      |  [x]   |
| T-013.3 | Direccion copiable con un tap                               |  [ ]   |
| T-013.4 | Soporte para multiples ubicaciones (ceremonia + recepcion)  |  [x]   |
| T-013.5 | Mapa estatico como fallback (imagen para performance)       |  [ ]   |

**Criterios de aceptacion:**

- El boton "Como llegar" abre la app de mapas del dispositivo
- La direccion se puede copiar con un tap

---

### HU-014: RSVP / Confirmacion de Asistencia

**Como** invitado, **quiero** confirmar mi asistencia desde la invitacion,
**para** que el organizador sepa si voy a ir.

| Tarea   | Descripcion                                                 | Estado |
| ------- | ----------------------------------------------------------- | :----: |
| T-014.1 | Formulario de RSVP (nombre, asistencia si/no, acompanantes) |  [x]   |
| T-014.2 | Campos opcionales: alergias alimentarias, mensaje           |  [x]   |
| T-014.3 | Confirmacion visual post-envio (animacion)                  |  [x]   |
| T-014.4 | Backend: almacenar y listar RSVPs por evento                |  [x]   |
| T-014.5 | Dashboard del organizador: vista de RSVPs                   |  [x]   |
| T-014.6 | Exportar RSVPs a CSV/Excel                                  |  [ ]   |
| T-014.7 | Notificacion al organizador cuando alguien confirma         |  [ ]   |

**Criterios de aceptacion:**

- El invitado puede confirmar con minima friccion (3 campos maximo)
- El organizador ve resumen de RSVPs en el dashboard
- Se puede exportar la lista de confirmados

---

## FASE 5: Compartir y Distribucion

### HU-015: Compartir por WhatsApp

**Como** organizador, **quiero** compartir el link de la invitacion por WhatsApp,
**para** que mis invitados la vean.

| Tarea   | Descripcion                                                      | Estado |
| ------- | ---------------------------------------------------------------- | :----: |
| T-015.1 | Boton "Compartir por WhatsApp" (deep link api.whatsapp.com)      |  [ ]   |
| T-015.2 | Mensaje predeterminado personalizable con el link                |  [ ]   |
| T-015.3 | Open Graph tags optimizados para preview de WhatsApp             |  [ ]   |
| T-015.4 | Imagen de preview (og:image) generada automaticamente            |  [ ]   |
| T-015.5 | Copiar link al portapapeles con un clic                          |  [ ]   |
| T-015.6 | Compartir por otros medios (Telegram, SMS, email, link generico) |  [ ]   |
| T-015.7 | QR code generado para la invitacion                              |  [ ]   |

**Criterios de aceptacion:**

- El link de WhatsApp abre con mensaje pre-escrito + link
- El preview en WhatsApp muestra imagen atractiva del evento
- Se puede generar QR para imprimir

---

### HU-016: Publicacion y Estado del Evento

**Como** organizador, **quiero** controlar cuando mi invitacion es visible,
**para** publicarla cuando este lista.

| Tarea   | Descripcion                                                     | Estado |
| ------- | --------------------------------------------------------------- | :----: |
| T-016.1 | Estados del evento: borrador, publicado, archivado              |  [ ]   |
| T-016.2 | Boton de publicar/despublicar                                   |  [ ]   |
| T-016.3 | Preview antes de publicar (exactamente como se vera)            |  [ ]   |
| T-016.4 | URL personalizable del evento                                   |  [ ]   |
| T-016.5 | Pagina de "invitacion no disponible" para eventos despublicados |  [ ]   |

**Criterios de aceptacion:**

- Solo eventos publicados son accesibles por URL publica
- El organizador puede previsualizar antes de publicar

---

## FASE 6: Analytics y Gestion Avanzada (Post-MVP)

### HU-017: Estadisticas del Evento

**Como** organizador, **quiero** ver cuantas personas vieron mi invitacion,
**para** saber el alcance.

| Tarea   | Descripcion                                      | Estado |
| ------- | ------------------------------------------------ | :----: |
| T-017.1 | Tracking de visitas por evento (page views)      |  [ ]   |
| T-017.2 | Tracking de dispositivos (mobile/desktop/tablet) |  [ ]   |
| T-017.3 | Tracking de fuente (WhatsApp, directo, otro)     |  [ ]   |
| T-017.4 | Grafico de visitas en el tiempo                  |  [ ]   |
| T-017.5 | Resumen de RSVPs vs visitas                      |  [ ]   |
| T-017.6 | Dashboard de analytics por evento                |  [ ]   |

**Criterios de aceptacion:**

- El organizador ve metricas claras de su evento
- Se distingue entre visitas unicas y totales

---

### HU-018: Gestion de Cuenta

**Como** organizador, **quiero** gestionar mi perfil y preferencias,
**para** tener control de mi cuenta.

| Tarea   | Descripcion                                 | Estado |
| ------- | ------------------------------------------- | :----: |
| T-018.1 | Editar perfil (nombre, email, foto)         |  [ ]   |
| T-018.2 | Cambiar contrasena                          |  [ ]   |
| T-018.3 | Historial de eventos (activos + archivados) |  [ ]   |
| T-018.4 | Eliminar cuenta y datos                     |  [ ]   |

---

## FASE 7: Admin Panel (Post-MVP)

### HU-019: Panel de Administracion

**Como** admin, **quiero** gestionar usuarios, templates y contenido,
**para** operar la plataforma.

| Tarea   | Descripcion                                           | Estado |
| ------- | ----------------------------------------------------- | :----: |
| T-019.1 | Dashboard admin con metricas globales                 |  [ ]   |
| T-019.2 | CRUD de usuarios (listar, bloquear, eliminar)         |  [ ]   |
| T-019.3 | CRUD de templates (crear, editar, activar/desactivar) |  [ ]   |
| T-019.4 | Moderacion de contenido (invitaciones reportadas)     |  [ ]   |
| T-019.5 | Logs de actividad                                     |  [ ]   |

---

## FASE 8: Monetizacion (Futuro/Opcional)

### HU-020: Planes y Pagos

**Como** organizador, **quiero** elegir un plan segun mis necesidades,
**para** acceder a features premium.

| Tarea   | Descripcion                                     | Estado |
| ------- | ----------------------------------------------- | :----: |
| T-020.1 | Definir planes (free, basic, premium)           |  [ ]   |
| T-020.2 | Integrar pasarela de pagos (Stripe/MercadoPago) |  [ ]   |
| T-020.3 | Limitar features por plan                       |  [ ]   |
| T-020.4 | Pagina de pricing                               |  [ ]   |
