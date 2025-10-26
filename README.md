# 🌟 AstrenAI - Star

La primera IA de AstrenAI. Star es tu compañera digital inteligente, diseñada para ayudarte con todo lo relacionado con Astren y sus proyectos.

## 🚀 Características

- **Chat Inteligente**: Conversa con Star usando el modelo Llama 3.1-8B
- **API Rápida**: Respuestas instantáneas gracias a Groq
- **Interfaz Moderna**: Diseño limpio y responsive
- **Contexto Astren**: Star conoce todo sobre Astren y sus proyectos
- **Deployment en la Nube**: Backend en Render, Frontend en Vercel

## 🛠️ Tecnologías

### Backend
- **FastAPI 0.100.0**: API REST moderna y rápida
- **Groq API**: Inferencia ultra-rápida de modelos de IA
- **Llama 3.1-8B**: Modelo de lenguaje avanzado
- **Python 3.11**: Versión estable y compatible

### Frontend
- **React 18**: Interfaz de usuario moderna
- **TypeScript**: Código tipado y seguro
- **Tailwind CSS**: Estilos elegantes y responsive
- **Vite**: Build rápido y eficiente
- **Shadcn/ui**: Componentes UI modernos

## 📁 Estructura del Proyecto

```
AstrenAI/
├── frontend/          # Aplicación React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── pages/         # Páginas principales
│   │   └── ...
│   └── dist/          # Build de producción
├── src/               # Backend Python
│   ├── star_api_render.py  # API para Render
│   └── star_groq.py       # Lógica de Star
├── public/            # Archivos estáticos
├── requirements.txt   # Dependencias Python
├── render.yaml       # Configuración Render
└── runtime.txt       # Versión Python
```

## 🌐 Deployment

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
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Variables de Entorno**:
  - `VITE_API_URL`: URL del backend de Render

## 🔧 Desarrollo Local

### Prerrequisitos
- Python 3.11+
- Node.js 18+
- npm o yarn

### Backend
```bash
# Instalar dependencias
pip install -r requirements.txt

# Ejecutar servidor local
python src/star_api_render.py
```
El backend estará disponible en `http://localhost:8000`

### Frontend
```bash
# Navegar al directorio frontend
cd frontend

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```
El frontend estará disponible en `http://localhost:5173`

## 📝 API Endpoints

### Endpoints Principales
- `GET /` - Información básica de la API
- `POST /api/chat` - Chat con Star
- `GET /api/health` - Estado del servicio

### Ejemplo de Uso
```bash
# Chat con Star
curl -X POST "https://astrenai-backend-xyz.onrender.com/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"message": "Hola Star, ¿cómo estás?"}'

# Verificar estado
curl "https://astrenai-backend-xyz.onrender.com/api/health"
```

## 🌟 Sobre Star

Star es la primera IA de AstrenAI, diseñada con:
- **Personalidad única**: Inteligente, empática y curiosa
- **Conocimiento Astren**: Sabe todo sobre la empresa y proyectos
- **Respuestas naturales**: Conversación fluida y contextual
- **Propósito claro**: Ayudar y asistir en todo lo relacionado con Astren

## 🚀 Estado del Proyecto

- ✅ **Backend**: API funcionando con Groq
- ✅ **Frontend**: Interfaz React moderna
- ✅ **Deployment**: Configurado para Render + Vercel
- ✅ **Documentación**: Completa y actualizada
- ✅ **Limpieza**: Proyecto optimizado y organizado

## 📋 Próximos Pasos

1. **Deploy en Render**: Configurar variables de entorno
2. **Deploy en Vercel**: Actualizar URL del backend
3. **Testing**: Probar funcionalidad completa
4. **Monetización**: Implementar planes de suscripción

---

**Desarrollado por AstrenAI** 🚀  
**Última actualización**: Enero 2025