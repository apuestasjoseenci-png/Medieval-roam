# Medieval Roam v0.0.8 — Primera aldea 3D real

La aldea ahora se representa mediante WebGL y Three.js (geometría tridimensional real, luces y sombras). Es un primer diorama técnico: NO alcanza aún el nivel de detalle de la imagen conceptual.

## Publicación
Subir todos los archivos y carpetas a la raíz del repositorio GitHub Pages, sustituyendo los anteriores. Conservar `scripts/scene3d.js`. Esperar despliegue, cerrar y abrir PWA.

## Notas
* La librería Three.js se descarga desde CDN y necesita conexión en la primera carga.
* Si WebGL no está disponible se muestra mensaje alternativo.
* La cartografía GPS sigue en Leaflet 2D. No se presenta como mundo GPS 3D.
* Las reglas de nodos +1, partida, GPS, edificios y colonos se conservan desde v0.0.7.
* Los modelos 3D son provisionales; la imagen de referencia es un objetivo visual, no un asset incluido.
