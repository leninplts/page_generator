# Modelo de Datos — Page Generator

## Diagrama de Entidades (ERD)

```
+------------------+       +------------------+       +------------------+
|      users       |       |     events       |       |    templates     |
+------------------+       +------------------+       +------------------+
| id (uuid) PK     |<---+  | id (uuid) PK     |  +-->| id (uuid) PK     |
| email (unique)   |    |  | user_id FK       |  |   | name             |
| password_hash    |    +--| template_id FK   |--+   | slug             |
| name             |       | event_type       |      | event_type       |
| avatar_url       |       | title            |      | category         |
| role (enum)      |       | slug (unique)    |      | preview_image    |
| created_at       |       | status (enum)    |      | default_config   |
| updated_at       |       | event_date       |      | sections_schema  |
+------------------+       | event_time       |      | is_active        |
                           | timezone         |      | created_at       |
                           | custom_config    |      +------------------+
                           | published_at     |
                           | created_at       |
                           | updated_at       |
                           +--------+---------+
                                    |
                    +---------------+---------------+
                    |               |               |
          +---------+------+ +-----+--------+ +----+---------+
          | event_sections | | event_media  | |   rsvps      |
          +----------------+ +--------------+ +--------------+
          | id (uuid) PK   | | id (uuid) PK | | id (uuid) PK |
          | event_id FK    | | event_id FK  | | event_id FK  |
          | section_type   | | type (enum)  | | name         |
          | order (int)    | | url          | | email        |
          | is_active      | | thumbnail_url| | attending    |
          | config (jsonb) | | alt_text     | | guests_count |
          | content (jsonb)| | order (int)  | | dietary_notes|
          | created_at     | | section_id FK| | message      |
          | updated_at     | | created_at   | | created_at   |
          +----------------+ +--------------+ +--------------+
                                                      |
                                               +------+-------+
                                               | event_views  |
                                               +--------------+
                                               | id (uuid) PK |
                                               | event_id FK  |
                                               | ip_hash      |
                                               | user_agent   |
                                               | referrer     |
                                               | device_type  |
                                               | viewed_at    |
                                               +--------------+
```

## Descripcion de Tablas

### users
Usuarios de la plataforma (organizadores y admins).

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | uuid | Primary key |
| email | varchar(255) | Email unico |
| password_hash | text | Hash de contrasena (bcrypt) |
| name | varchar(255) | Nombre completo |
| avatar_url | text | URL del avatar en S3 |
| role | enum('admin', 'organizer') | Rol del usuario |
| created_at | timestamp | Fecha de creacion |
| updated_at | timestamp | Ultima actualizacion |

### events
Eventos creados por los organizadores.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | uuid | Primary key |
| user_id | uuid FK | Organizador que creo el evento |
| template_id | uuid FK | Template elegido |
| event_type | enum | Tipo: birthday, xv, baptism, wedding, graduation |
| title | varchar(255) | Titulo del evento |
| slug | varchar(255) | URL unica del evento |
| status | enum | Estado: draft, published, archived |
| event_date | date | Fecha del evento |
| event_time | time | Hora del evento |
| timezone | varchar(50) | Zona horaria |
| custom_config | jsonb | Configuracion visual (colores, fonts, etc.) |
| published_at | timestamp | Cuando se publico |
| created_at | timestamp | Fecha de creacion |
| updated_at | timestamp | Ultima actualizacion |

### templates
Templates predefinidos para las invitaciones.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | uuid | Primary key |
| name | varchar(255) | Nombre del template |
| slug | varchar(255) | Identificador unico |
| event_type | enum | Tipo de evento compatible |
| category | varchar(100) | Categoria: elegant, modern, minimal, etc. |
| preview_image | text | URL de preview en S3 |
| default_config | jsonb | Config por defecto (colores, fonts, etc.) |
| sections_schema | jsonb | Secciones disponibles y su orden por defecto |
| is_active | boolean | Si esta disponible para usar |
| created_at | timestamp | Fecha de creacion |

### event_sections
Secciones/bloques de cada invitacion. Cada evento tiene multiples secciones.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | uuid | Primary key |
| event_id | uuid FK | Evento al que pertenece |
| section_type | enum | Tipo: hero, countdown, ceremony, reception, etc. |
| order | integer | Posicion en la pagina |
| is_active | boolean | Si esta visible |
| config | jsonb | Configuracion visual de la seccion |
| content | jsonb | Contenido de la seccion (textos, datos, etc.) |
| created_at | timestamp | Fecha de creacion |
| updated_at | timestamp | Ultima actualizacion |

**section_type enum values:**
hero, countdown, story, ceremony, reception, godparents, gallery, video,
itinerary, dresscode, entertainment, gifts, rsvp, message, music

**Ejemplo de content para seccion "ceremony":**
```json
{
  "place_name": "Iglesia San Francisco",
  "address": "Av. Principal 123, Ciudad",
  "time": "16:00",
  "latitude": -17.3895,
  "longitude": -66.1568,
  "notes": "Llegar 15 minutos antes"
}
```

**Ejemplo de content para seccion "godparents":**
```json
{
  "people": [
    { "name": "Juan Perez", "role": "Padrino", "photo_url": "..." },
    { "name": "Maria Lopez", "role": "Madrina", "photo_url": "..." }
  ]
}
```

### event_media
Archivos multimedia asociados a un evento.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | uuid | Primary key |
| event_id | uuid FK | Evento al que pertenece |
| type | enum('image', 'audio', 'video') | Tipo de media |
| url | text | URL en S3 |
| thumbnail_url | text | URL del thumbnail (para video) |
| alt_text | varchar(255) | Texto alternativo |
| order | integer | Orden en galeria |
| section_id | uuid FK (nullable) | Seccion a la que pertenece |
| metadata | jsonb | Metadatos (size, dimensions, duration) |
| created_at | timestamp | Fecha de creacion |

### rsvps
Confirmaciones de asistencia de los invitados.

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | uuid | Primary key |
| event_id | uuid FK | Evento al que confirma |
| name | varchar(255) | Nombre del invitado |
| email | varchar(255) (nullable) | Email del invitado |
| attending | boolean | Si asiste o no |
| guests_count | integer | Numero de acompanantes |
| dietary_notes | text (nullable) | Alergias/restricciones |
| message | text (nullable) | Mensaje para los anfitriones |
| created_at | timestamp | Fecha de confirmacion |

### event_views
Registro de visitas a invitaciones publicas (para analytics).

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| id | uuid | Primary key |
| event_id | uuid FK | Evento visitado |
| ip_hash | varchar(64) | Hash del IP (privacidad) |
| user_agent | text | User agent del navegador |
| referrer | text (nullable) | De donde viene (whatsapp, directo, etc.) |
| device_type | enum('mobile', 'tablet', 'desktop') | Tipo de dispositivo |
| viewed_at | timestamp | Momento de la visita |

## Indices Recomendados

```sql
-- Busqueda rapida de eventos por usuario
CREATE INDEX idx_events_user_id ON events(user_id);

-- Busqueda de evento publico por slug
CREATE UNIQUE INDEX idx_events_slug ON events(slug);

-- Filtro de eventos por tipo y estado
CREATE INDEX idx_events_type_status ON events(event_type, status);

-- Secciones ordenadas por evento
CREATE INDEX idx_sections_event_order ON event_sections(event_id, "order");

-- Media por evento
CREATE INDEX idx_media_event ON event_media(event_id);

-- RSVPs por evento
CREATE INDEX idx_rsvps_event ON rsvps(event_id);

-- Views por evento y fecha (analytics)
CREATE INDEX idx_views_event_date ON event_views(event_id, viewed_at);

-- Templates activos por tipo
CREATE INDEX idx_templates_type_active ON templates(event_type, is_active);
```

## Enums

```sql
CREATE TYPE user_role AS ENUM ('admin', 'organizer');
CREATE TYPE event_type AS ENUM ('birthday', 'xv', 'baptism', 'wedding', 'graduation');
CREATE TYPE event_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE media_type AS ENUM ('image', 'audio', 'video');
CREATE TYPE device_type AS ENUM ('mobile', 'tablet', 'desktop');
CREATE TYPE section_type AS ENUM (
  'hero', 'countdown', 'story', 'ceremony', 'reception',
  'godparents', 'gallery', 'video', 'itinerary', 'dresscode',
  'entertainment', 'gifts', 'rsvp', 'message', 'music'
);
```
