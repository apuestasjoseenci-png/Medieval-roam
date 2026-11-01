# Medieval Roam v0.0.6

## Cambios
- Mapa real con tratamiento cromático medieval, viñeta y marcadores ilustrados de recursos. Sigue siendo cartografía 2D; el mundo 3D aún está pendiente.
- Nuevo nodo global determinista de **alimentos silvestres 🍎**: 1 unidad por recolección. Requiere GPS y estar a 30 m o menos.
- Los nodos se generan según coordenadas, por lo que permanecen en el mismo lugar. Cada nodo se recoge una sola vez por partida.
- Conserva el guardado local de v0.0.5; las partidas nuevas comienzan con recursos y colonos a cero.
- Conserva los sistemas anteriores de aldea, construcción y producción.

## Publicación
Sube `index.html`, `service-worker.js`, `manifest.webmanifest` y las carpetas `styles`, `scripts`, `icons` al nivel raíz del repositorio GitHub Pages, reemplazando archivos coincidentes. Espera la publicación y reinicia la PWA para cargar la nueva versión.

## Limitaciones
Los mosaicos cartográficos de OpenStreetMap y Leaflet necesitan conexión; el GPS requiere HTTPS y permisos de ubicación. La partida se guarda solo en el dispositivo. El mapa visual sigue siendo 2D y no reproduce todavía los ocho biomas ni caminos 3D.

## Cambio v0.0.6
- Todos los nodos GPS (madera, piedra, mineral y alimentos) entregan exactamente **1 unidad** por recolección.
- Actualización de caché PWA para recibir el cambio.
