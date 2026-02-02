# AstrenAI - Star

## Descripción General

Star es un asistente conversacional inteligente desarrollado como parte del proyecto AstrenAI. Este sistema implementa una arquitectura full-stack que integra un modelo de lenguaje de gran tamaño (LLM) con una interfaz de usuario moderna, demostrando competencias en el desarrollo de aplicaciones web complejas y la integración de tecnologías de inteligencia artificial.

El proyecto representa una solución completa que abarca desde la implementación del backend con API RESTful hasta el diseño de una interfaz de usuario responsiva, incluyendo la configuración de infraestructura en la nube para su despliegue en producción.

## Características Principales

El sistema cuenta con las siguientes funcionalidades implementadas:

- **Procesamiento de Lenguaje Natural**: Integración con el modelo Llama 3.1-8B mediante la API de Groq para procesamiento de consultas en lenguaje natural
- **API RESTful**: Backend desarrollado con FastAPI, garantizando respuestas de baja latencia y alta concurrencia
- **Interfaz de Usuario Moderna**: Aplicación web desarrollada con React 18 y TypeScript, siguiendo las mejores prácticas de desarrollo frontend
- **Capacidades de Visión Computacional (Beta)**: Procesamiento y análisis de imágenes mediante modelos multimodales
- **Infraestructura en la Nube**: Despliegue distribuido utilizando Render para el backend y Vercel para el frontend

## Stack Tecnológico

### Backend

- **FastAPI 0.100.0**: Framework web asíncrono de alto rendimiento para Python
- **Groq API**: Plataforma de inferencia optimizada para modelos de lenguaje
- **Llama 3.1-8B**: Modelo de lenguaje de código abierto de Meta AI
- **Python 3.11**: Versión estable con mejoras en rendimiento y tipado

### Frontend

- **React 18**: Biblioteca de JavaScript para construcción de interfaces de usuario
- **TypeScript**: Superset tipado de JavaScript para desarrollo escalable
- **Tailwind CSS**: Framework CSS utilitario para diseño responsivo
- **Vite**: Herramienta de construcción moderna con hot module replacement
- **Shadcn/ui**: Sistema de componentes basado en Radix UI

## Arquitectura del Proyecto

```
AstrenAI/
├── frontend/                  # Aplicación cliente (React + TypeScript)
│   ├── src/
│   │   ├── components/       # Componentes reutilizables
│   │   ├── pages/           # Vistas principales de la aplicación
│   │   ├── contexts/        # Context API para gestión de estado
│   │   ├── hooks/           # Custom hooks de React
│   │   └── lib/             # Utilidades y helpers
│   └── dist/                # Artefactos de construcción
├── src/                     # Backend (Python + FastAPI)
│   ├── star_api_render.py   # Servidor API principal
│   └── star_groq.py         # Lógica de integración con Groq
├── public/                  # Recursos estáticos
├── requirements.txt         # Dependencias de Python
├── render.yaml             # Configuración de infraestructura
└── runtime.txt             # Especificación de versión de Python
```

## Configuración de Despliegue

### Backend (Render)
- **URL**: `https://astrenai-backend-xyz.onrender.com`
- **Configuración**: Ver `render.yaml`
- **Variables de Entorno**:
  - `GROQ_API_KEY`: API key de Groq
  - `PORT`: 8000
  - `HOST`: 0.0.0.0
- **Python Version**: 3.11.0 (especificado en `runtime.txt`)

### Frontend (Vercel)
- **URL**: `ai.astren.app`
## Configuración de Despliegue

### Backend (Render)

La API se encuentra desplegada en Render con la siguiente configuración:

- **URL de Producción**: `https://astrenai-backend-xyz.onrender.com`
- **Archivo de Configuración**: `render.yaml`
- **Variables de Entorno Requeridas**:
  - `GROQ_API_KEY`: Clave de API para acceso a Groq
  - `PORT`: Puerto de escucha del servidor (8000)
  - `HOST`: Dirección de binding (0.0.0.0)
- **Runtime**: Python 3.11.0 (especificado en `runtime.txt`)

### Frontend (Vercel)

La interfaz web se encuentra desplegada en Vercel:

- **URL de Producción**: `ai.astren.app`
- **Comando de Build**: `npm run build`
- **Directorio de Salida**: `dist`
- **Variables de Entorno**:
  - `VITE_API_URL`: URL del backend para comunicación cliente-servidor

## Instalación y Configuración Local

### Requisitos Previos

- Python 3.11 o superior
- Node.js 18 o superior
- npm o yarn como gestor de paquetes

### Configuración del Backend

```bash
# Instalación de dependencias
pip install -r requirements.txt

# Ejecución del servidor de desarrollo
python src/star_api_render.py
```

El servidor estará disponible en `http://localhost:8000`

### Configuración del Frontend

```bash
# Navegación al directorio del frontend
cd frontend

# Instalación de dependencias
npm install

# Ejecución del servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Documentación de la API

### Endpoints Disponibles

- `GET /` - Retorna información básica sobre la API
- `POST /api/chat` - Procesa mensajes del usuario y retorna respuestas del asistente
- `GET /api/health` - Endpoint de health check para monitoreo

### Ejemplo de Consumo

```bash
# Envío de mensaje al asistente
curl -X POST "https://astrenai-backend-xyz.onrender.com/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hola Star, ¿cómo estás?"}'

# Verificación del estado del servicio
curl "https://astrenai-backend-xyz.onrender.com/api/health"
```

## Características del Asistente

Star ha sido diseñado con las siguientes características:

- **Procesamiento Contextual**: Capacidad de mantener contexto en conversaciones extensas
- **Dominio Específico**: Conocimiento especializado sobre el ecosistema AstrenAI
- **Respuestas Naturales**: Generación de texto coherente y contextualmente relevante
- **Arquitectura Modular**: Diseño que facilita la extensión de capacidades

## Estado Actual del Proyecto

**Componentes Implementados:**

- Backend con API RESTful completamente funcional
- Frontend con interfaz de usuario moderna y responsiva
- Configuración de despliegue automatizado en Render y Vercel
- Documentación técnica completa
- Optimización de recursos y limpieza de código

**En Desarrollo:**

- Sistema de autenticación y gestión de usuarios
- Implementación de persistencia de conversaciones
- Mejora de capacidades de visión computacional
- Sistema de métricas y monitoreo

## Consideraciones Técnicas

Este proyecto demuestra competencias en:

- Diseño e implementación de APIs RESTful
- Desarrollo frontend con frameworks modernos
- Integración de modelos de inteligencia artificial
- Configuración de infraestructura en la nube
- Documentación técnica y mejores prácticas de desarrollo
- Arquitectura de software escalable

---

**Desarrollo**: AstrenAI  
**Última Actualización**: Enero 2026
**Versión**: 0.1.0
