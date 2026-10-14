# Contigo

Asistente de compañía y ayuda para personas mayores. Una charla que recuerda todo: turnos médicos, cosas pendientes, remedios, familia, gustos. Busca médicos y noticias en internet, explica fotos de recetas o papeles, muestra el clima y lee las respuestas en voz alta.

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

## Datos

Todo queda en el navegador del teléfono (`localStorage`). Desde Ajustes se puede guardar y recuperar una copia de seguridad en un archivo.
