# Medieval Roam v0.0.22
Correcciones del mapa GPS 3D:
- Nuevo filtro de mosaicos OpenStreetMap con mayor contraste entre calles, edificios, vegetación y agua.
- Texturas de 256 px para preservar los caminos estrechos en iPhone.
- Corrección de la caja de consulta Overpass a aproximadamente 720 x 720 metros (antes ~0,7 x 0,7 metros por división errónea entre 360).
- Los mosaicos se renderizan opacos para evitar que el color del suelo tape los detalles.
- Conserva la recolección a 50 metros, regeneración a las 3 horas, GPS automático y aldea.

Las líneas de parcelas catastrales no forman parte de la cartografía estándar de OSM y no se añaden en esta versión. La separación visible será la de calles, edificios y áreas verdes presentes en los datos de OSM.

Instalación: sustituye todos los archivos en GitHub Pages y comprueba que el indicador muestra v0.0.22.
