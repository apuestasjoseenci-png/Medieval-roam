# Medieval Roam v0.0.12

Actualización incremental sobre v0.0.10.

- Cámara 3D con seguimiento suavizado del jugador GPS.
- Gestos táctiles: arrastrar horizontalmente para girar y pellizcar para zoom.
- El mundo no se reconstruye con cada pequeño desplazamiento: recentrado de sector a 180 m.
- Los nodos 3D solo se regeneran cuando cambian o tras avanzar 12 m.
- Protección frente a respuestas antiguas de Overpass al cambiar de sector.
- Corrección de limpieza de objetos 3D al actualizar el terreno.
- Se conserva la regeneración individual de nodos cada 3 horas y la aldea.

El mapa depende de conexión a Internet para los datos de caminos de OpenStreetMap.
Para iOS, abrir en HTTPS y autorizar GPS.

## Novedades 0.0.12
- Terreno 3D con manchas de vegetación, hierba, flores, arbustos, árboles y rocas procedurales.
- Distribución reproducible por sector GPS y vegetación instanciada para reducir llamadas gráficas.
- Caminos reales de OpenStreetMap con bordes y materiales medievales diferenciados.
- La aldea, economía, GPS y respawn individual de 3 horas se mantienen.
- Nota: el relieve sigue siendo plano, no son biomas geográficos reales; las plantas son decoración generada.
