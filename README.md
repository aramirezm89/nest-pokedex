# Pokedex API - NestJS

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

Una API REST construida con NestJS para gestionar información de Pokémon, desarrollada como parte del curso de Fernando Herrera.

## 📋 Descripción

Esta aplicación es una API REST que permite gestionar información de Pokémon utilizando NestJS como framework backend y MongoDB como base de datos. El proyecto incluye configuración con Docker Compose para facilitar el desarrollo.

## 🚀 Configuración del Proyecto

### Prerrequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- [Yarn](https://yarnpkg.com/) o [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)
- [Git](https://git-scm.com/)

### 1. Clonar el Repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd 03-pokedex
```

### 2. Configurar Variables de Entorno

El proyecto incluye un archivo `.env.example` con las variables de entorno necesarias. Debes crear tu propio archivo `.env` basado en este ejemplo:

```bash
# Copia el archivo de ejemplo
cp .env.example .env
```

Edita el archivo `.env` y configura las siguientes variables con los valores apropiados:

```bash
MONGO_INITDB_ROOT_USERNAME=username
MONGO_INITDB_ROOT_PASSWORD=password
MONGO_INITDB_DATABASE=database-name
```

**⚠️ Importante:** 
- Cambia `username`, `password` y `database-name` por valores seguros apropiados para tu entorno
- No subas el archivo `.env` al repositorio (ya está incluido en `.gitignore`)

### 3. Instalar Dependencias

```bash
yarn install
# o si usas npm
npm install
```

### 4. Levantar la Base de Datos con Docker

El proyecto incluye un archivo `docker-compose.yaml` configurado para MongoDB. Para levantar la base de datos:

```bash
# Levantar MongoDB en segundo plano
docker-compose up -d

# Verificar que el contenedor esté ejecutándose
docker-compose ps
```

Esto creará:
- Un contenedor de MongoDB en el puerto `27017`
- Un volumen persistente en `./mongo-data` para almacenar los datos
- Las variables de entorno se tomarán automáticamente del archivo `.env`

### 5. Ejecutar la Aplicación

```bash
# Modo desarrollo (con watch)
yarn start:dev

# Modo desarrollo normal
yarn start

# Modo producción
yarn start:prod
```

La aplicación estará disponible en `http://localhost:3000`

## 🧪 Ejecutar Tests

```bash
# Tests unitarios
yarn test

# Tests en modo watch
yarn test:watch

# Tests end-to-end
yarn test:e2e

# Cobertura de tests
yarn test:cov
```

## 🐳 Comandos Docker Útiles

```bash
# Levantar servicios
docker-compose up -d

# Ver logs de MongoDB
docker-compose logs mongo

# Parar servicios
docker-compose down

# Parar servicios y eliminar volúmenes (⚠️ elimina datos)
docker-compose down -v

# Reconstruir imágenes
docker-compose up --build -d
```

## 📁 Estructura del Proyecto

```
03-pokedex/
├── src/                    # Código fuente
├── test/                   # Tests e2e
├── mongo-data/            # Datos de MongoDB (generado automáticamente)
├── docker-compose.yaml    # Configuración de Docker
├── .env.example          # Plantilla de variables de entorno
├── .env                  # Variables de entorno (crear manualmente)
└── package.json          # Dependencias y scripts
```

## 🔧 Scripts Disponibles

```bash
yarn build          # Compilar el proyecto
yarn format         # Formatear código con Prettier
yarn lint           # Ejecutar ESLint
yarn start          # Iniciar aplicación
yarn start:dev      # Iniciar en modo desarrollo
yarn start:debug    # Iniciar en modo debug
yarn start:prod     # Iniciar en modo producción
```

## 🌐 Endpoints de la API

Una vez que la aplicación esté ejecutándose, puedes acceder a:

- API Base: `http://localhost:3000`
- Documentación: `http://localhost:3000/api` (si está configurada Swagger)

## 🛠️ Tecnologías Utilizadas

- **Backend:** NestJS
- **Base de Datos:** MongoDB
- **Contenedores:** Docker & Docker Compose
- **Lenguaje:** TypeScript
- **Testing:** Jest
- **Linting:** ESLint + Prettier

## 📝 Notas Importantes

1. **Primer Uso:** Al ejecutar Docker Compose por primera vez, se descargará la imagen de MongoDB (puede tomar algunos minutos)

2. **Datos Persistentes:** Los datos de MongoDB se almacenan en `./mongo-data/` y persisten entre reinicios

3. **Puerto MongoDB:** El puerto 27017 debe estar disponible en tu sistema

4. **Variables de Entorno:** Nunca subas el archivo `.env` al repositorio por seguridad

## 🐛 Solución de Problemas

### Error de Puerto en Uso
```bash
# Verificar qué proceso usa el puerto 27017
netstat -tulpn | grep 27017
# o en Windows
netstat -ano | findstr 27017
```

### Problemas con Docker
```bash
# Limpiar contenedores y volúmenes
docker-compose down -v
docker system prune -f

# Reconstruir desde cero
docker-compose up --build -d
```

### Problemas con Dependencias
```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules yarn.lock
yarn install
```

## 📚 Recursos Adicionales

- [Documentación de NestJS](https://docs.nestjs.com)
- [MongoDB Documentation](https://docs.mongodb.com)
- [Docker Compose Reference](https://docs.docker.com/compose)

## 📄 Licencia

Este proyecto es parte del curso de NestJS de Fernando Herrera y tiene fines educativos.
