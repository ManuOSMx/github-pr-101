# Copilot App · Guía visual

Una aplicación web estática, en español, para entender de forma rápida cómo usar GitHub Copilot App: describe una idea, colabora con el asistente y decide qué resultado conservar.

## Abrir la aplicación

No necesitas instalar dependencias ni configurar un servidor. Abre `index.html` directamente en tu navegador:

```bash
open index.html
```

En Windows puedes hacer doble clic en `index.html`, o usar:

```powershell
start index.html
```

También puedes servirla localmente con cualquier servidor estático. Por ejemplo, si tienes Python instalado:

```bash
python3 -m http.server 8000
```

Después visita <http://localhost:8000>.

## Cómo usarla

1. Pulsa **Empezar la guía** para ir al flujo principal.
2. Revisa los tres pasos: **Describe**, **Colabora** y **Decide**.
3. Selecciona una tarjeta para destacarla y entender su papel en el proceso.
4. En **Empieza con un prompt**, elige una intención: construir, aprender o resolver.
5. Pulsa **Copiar prompt** para llevarte el ejemplo y adaptarlo a tu propio proyecto.
6. Usa el icono del sol en la esquina superior derecha para cambiar entre tema claro y oscuro.
7. En pantallas pequeñas, la navegación se adapta automáticamente a un formato compacto.

## Estructura

| Archivo | Contenido |
| --- | --- |
| `index.html` | Estructura y contenido de la guía |
| `styles.css` | Diseño responsive, colores y tema oscuro |
| `script.js` | Navegación, tarjetas interactivas, prompts y botón de copiar |

## Personalizarla

- Cambia los textos de la guía directamente en `index.html`.
- Añade o modifica ejemplos en el objeto `promptExamples` de `script.js`.
- Ajusta la paleta de colores mediante las variables al inicio de `styles.css`.
- Sustituye la fuente de Google Fonts por una fuente local si la aplicación debe funcionar sin conexión.

## Tecnologías

HTML semántico, CSS moderno y JavaScript vanilla. No utiliza frameworks ni dependencias externas, salvo las fuentes de Google Fonts cuando hay conexión a internet.
