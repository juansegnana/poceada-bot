# poceada-scrapper

Este bot tiene como objetivo ir a la página de la lotería chaqueña y obtener los resultados de la poceada. Estas se realizan los `martes, jueves y sábados`, los datos son cargados luego de las `22:05`, `GMT-3`.

## Uso

Comandos (`/`):
- start: registrarse para recibir resultados.
- stop: dejar de recibir resultados.
- misjugadas: listar jugadas pendientes de envío.
- borrarjugadas: borra jugadas pendientes de envío.
Sin comando (sin `/`):
- `/jugada/`: 5 números de 2 dígitos separados por un espacio. Ejemplo: `11 22 33 44 55`. Esto registra jugada.
### Configurar TS

Crear un archivo `tsconfig.json` en la carpeta raíz.

### Configurar DB

Para configurar DB con Prisma, usamos comando `npx prisma init`. Nos crea una carpeta `prisma`, donde allí configuramos nuestro motor de DB y los modelos. Para aplicar cambios y crear una db, hacer comando: `npx prisma migrate`.

### Configurar `.env`

Crear un archivo `.env` en la carpeta raíz. Colocar ruta de DB y token del bot:
```txt
DATABASE_URL="file:./poceada.db"
BOT_TOKEN=
```

# Versiones

## [Unreleased]
- .
## [0.1.0] - 2021-08-21
### Added
- Llamar a _hacerBusqueda_ y mandar resultados a usuarios registrados.
- Ajustar modelos de Prisma a consultas que necesite bot.
- El usuario manda su jugada sin hacer ningun comando.
- Notifica usuarios en DB luego de hacer búsqueda de resultados.
### Changed
- Mejorar output de los resultados.
- Bot en TS.

## [0.0.1] - 2021-08-15

### Added
- Nuevo type para los resultados de una jugada.
### Changed
- Estructura principal en TS.
- Cambios en types y manejo de jobs con respecto a versión anterior en JS. 