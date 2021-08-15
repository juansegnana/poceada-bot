# poceada-scrapper

### Dependencias del proyecto

```bash
npm i cheerio dotenv node-schedule request request-promise telegraf
```

### Dependencias de desarrollo

```bash
npm i -D @types/node prisma ts-node typescript
```

### Configurar TS

Crear un archivo `tsconfig.json` en la carpeta raíz.

### Configurar DB

Para configurar DB con Prisma, usamos comando `npx prisma init`. Nos crea una carpeta `prisma`, donde allí configuramos nuestro motor de DB y los modelos.

# Versiones

## [Unreleased]
- Mejorar output de los resultados.
- Bot en TS.
- Ajustar modelos de Prisma a consultas que necesite bot.
- Llamar a _hacerBusqueda_ y mandar resultados a usuarios registrados.

## [0.0.1] - 2021-08-15

### Added
- Nuevo type para los resultados de una jugada.
### Changed
- Estructura principal en TS.
- Cambios en types y manejo de jobs con respecto a versión anterior en JS. 