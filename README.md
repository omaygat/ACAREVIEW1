#  Revisor Automático de Escritura Académica

El **Revisor Automático de Escritura Académica** es una aplicación que analiza textos académicos para detectar errores ortográficos, sugerir mejoras de estilo y validar las referencias.  
El proyecto está dividido en **frontend** (interfaz de usuario) y **backend** (procesamiento y lógica).

---

## 📁 Estructura del proyecto

```
acareview/
├── backend/        # API principal: validaciones, análisis de texto, conexión con base de datos
├── frontend/       # Interfaz de usuario construida con React + TailwindCSS
├── tests/          # Pruebas unitarias y de integración (Jest)
├── README.md       # Documentación del proyecto
└── .github/
    └── workflows/
        └── ci.yml  # Automatización CI/CD con GitHub Actions
```

---

## ⚙️ Tecnologías principales

| Componente | Tecnología |
|-------------|-------------|
| **Frontend** | React + TailwindCSS |
| **Backend** | Node.js + Express |
| **Pruebas** | Jest |
| **CI/CD** | GitHub Actions |
| **Cobertura** | Jest + Codecov |

---

## 🚀 Instalación y ejecución

1. Clona el repositorio:
   ```bash
   git clone https://github.com/usuario/acareview.git
   cd acareview
   ```

2. Instala dependencias:
   ```bash
   npm install
   ```

3. Ejecuta el proyecto:
   ```bash
   npm run dev
   ```

---

## 🧪 Ejecución de pruebas

Para correr los tests localmente:
```bash
npm test
```

Las pruebas se ejecutan automáticamente con cada **push** o **pull request** gracias a **GitHub Actions**.

---

## 🧰 CI/CD y Automatización

Este proyecto incluye un pipeline de **Integración Continua (CI)** que:

- Ejecuta los tests automáticamente con cada commit.  
- Reporta la **cobertura de código**.  
- Muestra el estado de los tests en este README mediante **badges**.  
- Realiza **checks automáticos en los pull requests**.

---

## 📊 Estado del Proyecto

![Build](https://github.com/usuario/acareview/actions/workflows/ci.yml/badge.svg)
[![codecov](https://codecov.io/gh/usuario/acareview/branch/main/graph/badge.svg)](https://codecov.io/gh/usuario/acareview)

---

## 📄 Ejemplo de uso

En el frontend puedes ingresar un texto académico.  
El sistema analiza el contenido y muestra:

- Errores ortográficos detectados.  
- Recomendaciones de estilo.  
- Verificación de citas y referencias.  

---

## 💡 Organización del código

- **`backend/`** → Controladores, rutas y validadores.  
- **`frontend/`** → Componentes de interfaz, vistas y lógica de interacción.  
- **`tests/`** → Archivos `.test.js` con pruebas unitarias y de integración.  

Cada módulo está diseñado siguiendo el principio de **separación de responsabilidades** (*Separation of Concerns*), lo que facilita el mantenimiento y la escalabilidad del proyecto.

---

## 🧩 Archivos importantes

### `.github/workflows/ci.yml`
Ejemplo básico del pipeline de CI/CD:
```yaml
name: Node.js CI

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm install
      - run: npm test -- --coverage
```

---

## 📝 Licencia

Este proyecto está bajo la licencia **MIT**.
