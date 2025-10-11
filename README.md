
# ACAREVIEW1 - Revisor Académico IA

## Descripción del Proyecto

ACAREVIEW1 es una aplicación web para *análisis de texto académico*, que incluye:

- Resumen automático del texto.
- Corrección ortográfica y de estilo.
- Detección de citas (APA e IEEE).
- Detección de plagio y comparación de textos.
- Dashboard interactivo en *React* para el frontend y API en *Node.js/Express* para el backend.

---

## Estructura del Proyecto



acareview1/
├─ backend/
│ ├─ src/
│ │ ├─ controllers/
│ │ ├─ services/
│ │ └─ models/
│ ├─ tests/
│ │ ├─ controllers/
│ │ ├─ services/
│ │ └─ models/
│ ├─ package.json
│ └─ .env # No subir al repositorio
├─ frontend/
│ ├─ src/
│ │ ├─ components/
│ │ ├─ hooks/
│ │ └─ App.jsx
│ ├─ tests/
│ │ └─ integration/
│ └─ package.json
└─ README.md


---

## Instalación

### Requisitos Previos

- Node.js >= 18
- npm >= 9
- Docker y Docker Compose (opcional, para contenedores)

### Backend

1. Ir a la carpeta backend/:
   ```bash
   cd backend


Instalar dependencias:

npm install


Configurar variables de entorno creando un archivo .env con:

PORT=4000
MONGO_URI=<tu_mongo_uri>
HF_TOKEN=<tu_huggingface_token>


⚠ No subir este archivo al repositorio.

Ejecutar servidor:

npm run dev

Frontend

Ir a la carpeta frontend/:

cd frontend


Instalar dependencias:

npm install


Ejecutar aplicación:

npm start

Tests
Backend

Ejecutar tests y generar cobertura:

cd backend
npm test -- --coverage


Cobertura mínima: 50% en controladores y servicios.

Uso de mocks para bases de datos y servicios externos.

Frontend

Ejecutar tests de componentes e integración:

cd frontend
npm test


Cobertura mínima: 50% en componentes y hooks.

Testing de interacción de usuario y mocking de APIs.

Dockerización (Opcional)

Construir contenedores:

docker-compose build


Ejecutar contenedores:

docker-compose up


Ejecutar tests dentro del contenedor:

docker compose run backend npm test
docker compose run frontend npm test

Buenas Prácticas

Se sigue la metodología TDD: ciclo rojo-verde-refactor.

GitHub Actions ejecuta tests automáticamente en cada push y PR.

Cobertura de tests reportada en PRs.

Contribución

Hacer fork del repositorio.

Crear branch con la funcionalidad: git checkout -b feature/nueva-funcionalidad.

Hacer commits claros siguiendo TDD.

Abrir Pull Request para revisión.