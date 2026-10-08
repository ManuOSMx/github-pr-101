# GitHub + Pull Requests 101

Esta guía explica el flujo de trabajo básico para colaborar en GitHub con Git y pull requests (PR).

## 1. La idea básica

- **Git** realiza un seguimiento de los cambios en los archivos de tu computadora.
- **GitHub** aloja repositorios de Git en línea y agrega herramientas de colaboración.
- Una **rama** (`branch`) es una línea de trabajo independiente.
- Un **commit** es un punto de control guardado en el historial de Git.
- Un **pull request** propone combinar una rama con otra, normalmente `main`.

El flujo de trabajo típico es:

```text
clonar → crear una rama → editar archivos → hacer commit → hacer push → abrir un PR
         → revisar → actualizar → combinar
```

## 2. Configuración inicial

Instala Git y configura tu identidad:

```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu@ejemplo.com"
```

Autentícate en GitHub usando GitHub CLI:

```bash
gh auth login
```

o configura credenciales SSH para tu cuenta de GitHub.

## 3. Obtener un repositorio

En GitHub, abre el repositorio y selecciona **Code → Local → HTTPS** o **SSH**. Después, clónalo:

```bash
git clone https://github.com/OWNER/REPOSITORY.git
cd REPOSITORY
```

Comprueba el estado del repositorio:

```bash
git status
git remote -v
```

`origin` es el nombre habitual del repositorio de GitHub que clonaste.

## 4. Comenzar a trabajar en una rama

Normalmente no debes trabajar directamente en `main`. Primero actualízala y luego crea una rama descriptiva:

```bash
git switch main
git pull origin main
git switch -c fix/improve-readme
```

Algunos nombres comunes para ramas son:

```text
feature/add-search
fix/login-error
docs/update-installation
```

Mantén cada rama enfocada en un solo cambio.

## 5. Hacer cambios y commits

Edita los archivos y revisa qué cambió:

```bash
git status
git diff
```

Prepara los archivos que quieras incluir:

```bash
git add README.md
# O prepara todos los cambios previstos:
git add .
```

Crea un commit claro:

```bash
git commit -m "Improve installation instructions"
```

Un buen mensaje de commit explica qué hace el commit. Agrupa los cambios relacionados y evita mezclar tareas de limpieza no relacionadas en el mismo commit.

## 6. Hacer push de tu rama

El primer push conecta tu rama local con su rama en GitHub:

```bash
git push -u origin fix/improve-readme
```

Después, normalmente bastará con:

```bash
git push
```

## 7. Abrir un pull request

En GitHub:

1. Abre el repositorio.
2. Selecciona **Compare & pull request** para la rama que subiste.
3. Confirma que la rama base sea `main`.
4. Añade un título útil.
5. Explica qué cambió y por qué.
6. Incluye los pasos de prueba o capturas de pantalla cuando sea útil.
7. Solicita revisores.

También puedes usar GitHub CLI:

```bash
gh pr create --base main --head fix/improve-readme
```

### Un ejemplo de descripción de PR

```markdown
## Qué cambió
- Se actualizaron las instrucciones de instalación.

## Por qué
A los nuevos colaboradores les faltaba el paso de autenticación.

## Pruebas
- Se revisaron los comandos en macOS y Linux.
```

## 8. Revisar y actualizar el PR

Los revisores pueden:

- Aprobar el PR.
- Dejar comentarios o solicitar cambios.
- Hacer preguntas.

Realiza los cambios solicitados en la misma rama local:

```bash
git status
# edita los archivos
git add path/to/file
git commit -m "Address review feedback"
git push
```

El PR se actualiza automáticamente cuando haces push de nuevos commits a su rama.

Antes de solicitar otra revisión, comprueba el estado de las verificaciones del PR y resuelve las conversaciones abiertas.

## 9. Mantener actualizada tu rama

Si `main` cambia mientras tu PR está abierto:

```bash
git switch main
git pull origin main
git switch fix/improve-readme
git merge main
git push
```

Si Git informa de conflictos:

1. Abre cada archivo en conflicto.
2. Elimina los marcadores de conflicto: `<<<<<<<`, `=======` y `>>>>>>>`.
3. Conserva el contenido final correcto.
4. Prepara los archivos resueltos.
5. Finaliza el commit de merge.
6. Ejecuta las pruebas y haz push.

```bash
git add path/to/resolved-file
git commit
git push
```

Algunos equipos usan rebase en lugar de merge para actualizar una rama. Consulta las pautas de contribución del repositorio antes de reescribir el historial.

## 10. Combinar el PR

Cuando el PR esté aprobado y las verificaciones hayan pasado, un mantenedor lo combina en GitHub. GitHub puede ofrecer:

- **Merge commit**: conserva todos los commits de la rama y agrega un commit de merge.
- **Squash and merge**: combina el PR en un solo commit.
- **Rebase and merge**: aplica los commits directamente sobre la rama base.

Usa la opción preferida por el proyecto. Después de combinar el PR:

```bash
git switch main
git pull origin main
git branch -d fix/improve-readme
```

Si la rama remota no se elimina automáticamente:

```bash
git push origin --delete fix/improve-readme
```

## 11. Comandos usados con frecuencia

| Comando | Propósito |
| --- | --- |
| `git status` | Muestra la rama actual y los archivos modificados |
| `git switch main` | Cambia a la rama `main` |
| `git switch -c branch-name` | Crea una rama y cambia a ella |
| `git pull` | Descarga e integra cambios remotos |
| `git add file` | Prepara un archivo para el siguiente commit |
| `git diff` | Muestra los cambios que aún no están preparados |
| `git diff --staged` | Muestra los cambios preparados |
| `git commit -m "message"` | Crea un commit |
| `git push` | Sube commits a GitHub |
| `git log --oneline` | Muestra un historial de commits compacto |
| `git branch` | Enumera las ramas locales |
| `gh pr status` | Muestra el estado de tus PR con GitHub CLI |

## 12. Buenas prácticas

- Descarga la última versión de `main` antes de comenzar un trabajo nuevo.
- Usa una rama para cada funcionalidad, corrección o cambio de documentación.
- Mantén los commits y PR lo suficientemente pequeños para facilitar la revisión.
- Escribe las descripciones de PR pensando en la persona que revisará tu trabajo.
- Ejecuta las pruebas y los linters antes de abrir o actualizar un PR.
- Nunca subas contraseñas, claves API, tokens ni certificados privados.
- No hagas force-push en una rama compartida.
- Lee `CONTRIBUTING.md` y las instrucciones específicas del repositorio.

## Referencia rápida

```bash
git clone https://github.com/OWNER/REPOSITORY.git
cd REPOSITORY
git switch main
git pull origin main
git switch -c feature/my-change

# edita los archivos
git status
git diff
git add .
git commit -m "Describe the change"
git push -u origin feature/my-change

# Abre el PR en GitHub, responde a la revisión y después:
git push

# Después de combinar el PR:
git switch main
git pull origin main
git branch -d feature/my-change
```
