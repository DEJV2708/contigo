# Contigo

Tu asistente IA. Una charla que recuerda todo: turnos médicos, cosas pendientes, remedios, familia, gustos. Busca médicos y noticias en internet, explica fotos de recetas o papeles, muestra el clima y lee las respuestas en voz alta.

**Abrir:** https://dejv2708.github.io/contigo/ (se puede instalar en el celular: menú del navegador → "Agregar a la pantalla de inicio").

## Inteligencia artificial

Funciona con la clave (API key) de quien la use, guardada solo en el teléfono:

| Proveedor | Costo | Búsqueda en internet | Fotos |
|---|---|---|---|
| Gemini (Google AI Studio) | gratis con límite diario | sí (Google Search) | sí |
| Claude (Anthropic) | pago por uso | sí (web search) | sí |
| Groq | gratis con límites | sí (modelo compound) | modelos de visión |
| OpenRouter | modelos gratis; la búsqueda requiere crédito | sí (plugin web) | según modelo |

Otras APIs: clima de [Open-Meteo](https://open-meteo.com) (sin clave), voz natural de Gemini TTS (si hay clave de Gemini), dictado por voz del navegador.

## Datos y sincronización

Todo queda en el navegador de cada equipo (`localStorage`). Para tener lo mismo en el teléfono y en la compu: Ajustes → "Activar en este equipo" genera un código de 16 caracteres (y un QR); en el otro equipo se escanea el QR o se escribe el código en "Ya tengo un código".

Los datos se cifran en el equipo (AES-GCM, clave derivada del código con PBKDF2) antes de salir. El servidor ([`sync/Codigo.gs`](sync/Codigo.gs), Google Apps Script) solo guarda texto cifrado, identificado por un hash del código: nunca ve el código ni el contenido. Sin el código los datos no se pueden recuperar.

Para instalar el servidor: crear un proyecto en script.google.com, pegar `sync/Codigo.gs`, Implementar → Nueva implementación → Aplicación web (Ejecutar como: Yo · Acceso: Cualquier persona) y poner la URL `/exec` en `SYNC_URL` de `index.html`.

También hay copia de seguridad manual en un archivo (Ajustes).
