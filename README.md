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
## 🧭 System Usability Scale (SUS)

El **System Usability Scale (SUS)** es un método estandarizado que permite evaluar la facilidad de uso percibida por los usuarios respecto al sistema **Revisor Automático de Escritura Académica**.

| Indicador | Resultado |
|------------|------------|
| **Puntaje promedio SUS** | **63 / 100** |

### 📊 Interpretación del resultado
Un puntaje de **63** indica una **usabilidad moderada**, ligeramente por debajo del promedio (68), lo que sugiere que el sistema es **funcional**, pero **requiere mejoras en la experiencia de usuario** para alcanzar un nivel de usabilidad superior.

### 💡 Recomendación
> **Mejorar las preguntas a nivel de todo tipo de usuario**, buscando un lenguaje más claro, inclusivo y comprensible, que facilite la interacción sin importar el nivel de conocimiento técnico del evaluador.
📁 *Archivo fuente:* [`Evaluación de Usabilidad - Revisor Académico.csv`](https://drive.google.com/file/d/16p3Altjp-7FwlvOwvJn33B_79qZk5G2w/view?usp=drive_link)


---
## 🧠 Evaluación de Usabilidad según Nielsen

La **Evaluación de Usabilidad basada en las Heurísticas de Nielsen** se centró en analizar la interfaz y la experiencia del usuario bajo los **10 principios heurísticos** propuestos por Jakob Nielsen.

### 🔍 Objetivo
Identificar problemas de usabilidad en el sistema y proponer mejoras que optimicen la interacción usuario–interfaz.

### 🧾 Resultados
El análisis se realizó considerando aspectos como **visibilidad del estado del sistema**, **control y libertad del usuario**, **consistencia**, **prevención de errores**, entre otros.

📁 *Archivo fuente:* [`Evaluación de Usabilidad - Revisor Académico.csv`](https://drive.google.com/file/d/1Ry_TNSTIg5i49Ath7eS29GuZf2HnWByc/view?usp=drive_link)

### 💡 Conclusión general
> La evaluación mostró un **buen cumplimiento de los principios heurísticos**, pero se recomienda fortalecer la **retroalimentación visual y los mensajes de ayuda**, especialmente en etapas donde el usuario realiza correcciones o análisis más detallados.


---
## 🌱 Reporte de Optimización Verde

Se realizó una optimización del proyecto MERN **ACAREVIEW1** aplicando principios de software verde, con el objetivo de mejorar el rendimiento y reducir el consumo energético. Las mejoras incluyeron implementación de caché, compresión Gzip/Brotli y reducción del bundle del frontend, lo que permitió disminuir tiempos de carga, peso de recursos y uso de CPU, logrando un impacto energético estimado entre el 30% y 50%. Este proceso fortaleció la eficiencia del sistema y mejoró la experiencia del usuario, dejando bases claras para futuras optimizaciones.

📁  *Archivo fuente:* [`Evaluación de Usabilidad - Revisor Académico.csv`](https://docs.google.com/document/d/1NpgXUdQWBHxNobmcIXk87MVb524Pcrmu/edit?usp=sharing&ouid=117015765734330788895&rtpof=true&sd=true)

---
---
---
## 📝 Licencia

Este proyecto está bajo la licencia **MIT**.




