# poceada-scrapper

Este bot tiene como objetivo ir a la página de la lotería chaqueña y obtener los resultados de la poceada. Estas se realizan los `martes, jueves y sábados`, los datos son cargados luego de las `22:05`, `GMT-3`.

## Uso

### Comandos (`/`):
- start: registrarse para recibir resultados.
- stop: dejar de recibir resultados.
- misjugadas: listar jugadas pendientes de envío.
- borrarjugadas: borra jugadas pendientes de envío.

### Sin comando (sin `/`):
- `/jugada/`: 5 números de 2 dígitos separados por un espacio o caracter. Ejemplo: `11 22 33 44 55`. Esto registra jugada que será enviada en el próximo sorteo.

## Configurar `.env`

Crear un archivo `.env` en la carpeta raíz. Colocar ruta de DB y token del bot:

```txt
# Si es SQLITE
DATABASE_URL="file:./rutaParaDB.db"
# Si es MongoDB
DATABASE_URL="link.de.mongodb"
BOT_TOKEN=
```

## Database

### Configurar SQLite

Para crear DB local, en el archivo `schema.prisma` debe indicarse al `provider` como `sqlite`. Luego ejecutar comando: `npx prisma migrate dev`. 

### Configurar MongoDB

Crear una base de datos en [MongoDB](https://www.mongodb.com/), luego copiar link de acceso y pegarlo en el archivo `.env`. En el archivo `schema.prisma`, debe colocarse (en `generator db`) `provider = "mongodb"` y agregar opción `previewFeatures = ["mongoDb"]` en el `generator client`. Luego ejecutar comando: `npx prisma generate`. Más info en: [Prisma Docs](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/mongodb-typescript-mongodb).

# Versiones

## [1.0.0] - 2021-09-07
### Changed
- Base de datos por defecto es MongoDB.
- Se adaptó usó en Replit.
- Se mejoró la exp. regular para capturar jugadas. Permite uso de separadores entre medio de números (`, - / _`, etc.).
### Added
- Se puede generar una jugada aleatoria.

## [0.1.1] - 2021-08-21
### Changed
- Mejoras en loops con funciones async/await.
- Mejora en regex para jugadas.

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
