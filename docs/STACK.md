# Stack Tecnologico — Page Generator

## Vision del Producto

Plataforma SaaS de generacion de invitaciones digitales para eventos.
Un organizador crea un evento, personaliza un template, y genera una pagina publica
con URL unica para compartir por WhatsApp. Los invitados la ven desde el celular.

## Contexto del Proyecto

- **Desarrollador**: Solo (1 persona)
- **Hosting**: VPS propio con Dokploy
- **Base de datos**: PostgreSQL (existente en VPS)
- **Storage**: AWS S3 (bucket propio)
- **Email**: Resend (configurado con libbagroup.com)
- **Pagos**: No hay pasarela de pagos
- **Prioridad**: Performance mobile (distribucion via WhatsApp)

---

## Stack Definitivo

| Capa | Tecnologia | Version | Razon |
|------|-----------|---------|-------|
| Framework | Astro | 5.x | Zero JS en paginas publicas, SSR para OG tags |
| Islas interactivas | React | 19.x | Dashboard y editor como componentes interactivos |
| Lenguaje | TypeScript | 5.x | Type safety en todo el proyecto |
| UI Components | shadcn/ui | latest | Componentes accesibles, customizables |
| Styling | Tailwind CSS | 4.x | Utility-first, responsive mobile-first |
| DB | PostgreSQL | 15+ | Ya disponible en VPS |
| ORM | Drizzle ORM | latest | Type-safe, liviano, queries SQL-like |
| Auth | Better Auth | latest | Framework-agnostic, funciona con Astro |
| Storage | AWS S3 | - | Bucket para imagenes, audio, video |
| Email | Resend | latest | Ya configurado con libbagroup.com |
| Validacion | Zod | latest | Schemas compartidos front/back |
| Estado (client) | Zustand | latest | Estado del editor de invitaciones |
| Drag & Drop | dnd-kit | latest | Reordenar secciones |
| Rich Text | Tiptap | latest | Editor de mensajes/dedicatorias |
| Animaciones | Framer Motion | latest | Animaciones en la invitacion publica |
| Mapas | Mapbox GL JS | latest | Estilos elegantes para ubicaciones |
| Imagenes | Sharp + S3 | latest | Compresion/resize server-side |
| Audio/Video | HTML5 nativo + S3 | - | Reproductor custom responsive |
| Deploy | Dokploy (Docker) | - | VPS, 1 container |

---

## Arquitectura de Alto Nivel

```
+---------------------------------------------------+
|                   ASTRO 5 (SSR)                    |
|                                                     |
|  +-------------------+  +------------------------+ |
|  | Paginas Publicas   |  |  Dashboard (React)     | |
|  | (Astro puro)       |  |  (Islas interactivas)  | |
|  |                    |  |                        | |
|  | - Invitacion       |  | - Editor de evento     | |
|  | - Countdown        |  | - Personalizacion      | |
|  | - Galeria          |  | - Drag & Drop          | |
|  | - RSVP form        |  | - Preview en vivo      | |
|  | - Mapbox           |  | - Upload multimedia    | |
|  |                    |  |                        | |
|  | Zero JS            |  | React + Zustand        | |
|  +-------------------+  +------------------------+ |
|                                                     |
|  +-----------------------------------------------+ |
|  |         API Routes (Astro endpoints)           | |
|  | - /api/events/*    - /api/auth/*               | |
|  | - /api/rsvp/*      - /api/upload/*             | |
|  | - /api/templates/* - /api/analytics/*          | |
|  +----------------------+------------------------+ |
|                          |                          |
|  +-----------------------+------------------------+ |
|  |      Drizzle ORM + Better Auth + Zod           | |
|  +-----------------------+------------------------+ |
+--------------------------|-------------------------+
                           |
          +----------------+----------------+
          |                |                |
    +-----+------+  +-----+------+  +------+-----+
    | PostgreSQL  |  |   AWS S3   |  |   Resend   |
    |   (VPS)    |  |  (media)   |  |  (email)   |
    +------------+  +------------+  +------------+
```

## Decisiones Arquitectonicas Clave

### Por que Astro sobre Next.js?

- **Paginas publicas ultra rapidas**: Astro genera HTML puro sin JS por defecto.
  Las invitaciones cargan volando en 3G — critico para mobile/WhatsApp.
- **Modelo de islas**: El dashboard usa React como isla interactiva.
  Las paginas publicas usan Astro puro (zero JS).
- **SSR nativo**: OG tags para preview de WhatsApp funcionan de una.
- **Un solo proyecto, un solo deploy**: 1 container en Dokploy.

### Por que Mapbox sobre Leaflet?

- Estilos visuales muy superiores (streets, dark, satellite, custom)
- WebGL vector tiles (mejor performance)
- Free tier de 50,000 cargas/mes (mas que suficiente)
- Mapbox Studio para customizar temas de mapa

### Por que Drizzle sobre Prisma?

- Mas liviano (no genera client pesado)
- Queries SQL-like (mas control)
- Type-safe sin code generation
- Mejor DX para migraciones

### Por que Better Auth sobre NextAuth?

- Framework-agnostico (funciona con Astro nativamente)
- No depende de Next.js
- Soporte para JWT + sessions
- Mas simple de configurar

### Templates como componentes (Opcion A)

- Los templates son componentes Astro/React que reciben datos como props
- El organizador NO arrastra elementos libremente (no es un page builder)
- Personaliza via panel de configuracion: colores, fonts, secciones on/off, orden
- Las secciones se reordenan con drag & drop de LISTA (no de canvas)
- Esto es manejable para un dev solo (un page builder tipo Opcion B seria un proyecto entero)

---

## Tipos de Evento Soportados

1. Cumpleanos
2. XV Anos (Quinceanera)
3. Bautizo
4. Boda
5. Graduacion

## Secciones/Bloques de una Invitacion

1. Hero (imagen principal + nombres + fecha)
2. Countdown (cuenta regresiva animada)
3. Historia/Sobre (texto narrativo)
4. Ceremonia (lugar, hora, mapa)
5. Recepcion (lugar, hora, mapa)
6. Padrinos/Familia (grid con foto y rol)
7. Galeria (carousel/grid de fotos)
8. Video (embebido o subido)
9. Itinerario (timeline del evento)
10. Dress Code (paleta de colores)
11. Amenidades (DJ, banda, etc.)
12. Mesa de Regalos (links o datos bancarios)
13. RSVP (formulario de confirmacion)
14. Mensaje (frase o dedicatoria)
15. Musica (control de audio flotante)

## Roles de Usuario

| Rol | Descripcion |
|-----|-------------|
| Admin | Gestiona la plataforma, templates, usuarios |
| Organizador | Crea eventos, customiza invitaciones, comparte links |
| Invitado | Ve la invitacion (publico, sin login) |
