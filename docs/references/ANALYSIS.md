# Analisis de Referencia — specially.love/demo-classic-pastel

## URL: https://specially.love/demo-classic-pastel

## Tipo: Boda (Classic Pastel)

## Estructura de Secciones (orden real)

1. **Splash/Cover** — Pantalla completa con "PULSA AQUI Y DESLIZA", autoplay musica
2. **Hero** — Nombres en tipografia script dentro de corona floral circular dorada con hojas eucalipto, "NOS CASAMOS!", fecha centrada
3. **Foto pareja** — Foto full-width con efecto papel rasgado en bordes
4. **Frase/Story** — Texto cursivo sobre fondo blanco: "Todos los dias pueden ser el comienzo de algo nuevo"
5. **Mensaje invitacion** — Fondo azul pastel con efecto papel rasgado, texto invitando a acompanar
6. **Ceremonia** — Titulo "Ceremonia" en script, nombre del lugar en caps, foto del lugar, hora, boton "Pulsa para ver en Maps"
7. **Celebracion** — Mismo formato que ceremonia pero para la recepcion
8. **Dress Code** — Titulo script, "FORMAL", texto, iconos de corbata y vestido
9. **Autobus** — Fondo azul, info de transporte entre iglesia y restaurante
10. **Alojamientos** — Lista de hoteles cercanos con links
11. **Confirmar Asistencia (RSVP)** — Icono sobre animado, "Pulsa en el sobre"
12. **Itinerario** — Timeline vertical: 18:00h Ceremonia, 19:30h Cocktail, 20:30h Banquete, etc.
13. **Regalo** — Fondo azul, texto + numero de cuenta bancaria + icono copiar
14. **Album de Fotos** — QR code + codigo del album para compartir fotos
15. **Countdown** — "Nos vemos en" + Dias/Horas/Mins/Segs

## Patrones de Diseno Identificados

### Paleta de Colores

- Fondo principal: #FFFFFF (blanco)
- Fondo alternante: #B8D4E3 (azul pastel) — usado en secciones alternas
- Texto principal: #252525 (casi negro)
- Texto secundario: #8B9DAF (gris azulado)
- Acento: dorado en corona floral
- Tipografia titulo: Script cursiva (tipo Great Vibes / Alex Brush)
- Tipografia body: Serif o sans-serif ligera

### Efectos Visuales

- **Papel rasgado** — Bordes irregulares entre secciones (SVG o imagen)
- **Secciones alternas** — Fondo blanco / fondo azul pastel alternando
- **Corona floral** — SVG/imagen decorativa alrededor de nombres en hero
- **Iconos ilustrados** — Estilo hand-drawn/line art (mapa, vestido, corbata, regalo, sobre, camara)
- **Fotos con bordes suaves** — Esquinas redondeadas, sombra sutil
- **Animaciones scroll** — Fade-in al hacer scroll (sutil, no agresivo)

### Interactividad

- **Splash screen** — Click para entrar + iniciar musica
- **Musica de fondo** — Autoplay despues del gesto, boton flotante play/pause (esquina inferior derecha)
- **Boton "Ver en Maps"** — Abre Google Maps / app nativa
- **RSVP** — Click en sobre para confirmar
- **Copiar cuenta bancaria** — Click para copiar al portapapeles
- **QR album** — Escaneable para subir fotos
- **Countdown** — Animado en tiempo real

### Layout

- **Max-width: ~md (448px)** — Simulando ancho de celular incluso en desktop
- **Single column** — Todo vertical, scroll natural
- **Centrado** — Todo el contenido centrado
- **Spacing generoso** — Mucho padding vertical entre secciones
- **Full-bleed images** — Fotos van de borde a borde del max-width

## Lo que Necesitamos Implementar (Prioridad)

### Must-Have para MVP

1. Splash screen con musica
2. Hero con nombres + fecha + decoracion
3. Secciones alternantes fondo blanco/color
4. Ceremonia y Recepcion con link a Maps
5. Countdown animado
6. RSVP interactivo
7. Musica flotante (play/pause)

### Nice-to-Have

1. Efecto papel rasgado entre secciones
2. Corona floral SVG
3. Iconos hand-drawn
4. Album de fotos con QR
5. Copiar al portapapeles
