# Medieval Roam v0.0.3 — PWA para iPhone

## Cambios
- App web instalable: manifest, iconos y service worker.
- Separación inicial de HTML, estilos y lógica para facilitar el desarrollo modular y futura escena 3D.
- Mantiene la interfaz móvil y mecánicas de la v0.0.2, incluido GPS y recursos iniciales a cero.
- Se mantiene el guardado local existente de la v0.0.2 para evitar perder partidas.

## Publicación en GitHub Pages
1. Descomprime el ZIP.
2. En la raíz del repositorio `Medieval-roam`, sustituye `index.html` y sube también `manifest.webmanifest`, `service-worker.js` y las carpetas `styles`, `scripts`, `icons` con su contenido. **No subas la carpeta contenedora `medieval-roam-v0.0.3`**.
3. Espera a que termine la publicación de Pages y abre https://apuestasjoseenci-png.github.io/Medieval-roam/ en Safari.
4. En Safari toca Compartir > Añadir a pantalla de inicio > Añadir. Abre el icono instalado y permite el GPS.

## Limitaciones
- La PWA necesita conexión para cargar el mapa de OpenStreetMap y Leaflet. El service worker guarda la estructura de la aplicación, no el mapa GPS para uso sin conexión.
- El GPS de iOS no se mantiene de forma fiable en segundo plano.
- El guardado está en el navegador/dispositivo, sin sincronización entre dispositivos.
- La aldea todavía es una representación 2D provisional, no un entorno 3D.
- Los iconos son provisionales.
- Para probar el juego por primera vez con recursos a cero, usa el botón de reiniciar partida si conservas recursos de versiones anteriores.
