# AstrenAI - Deployment Configuration

## 🚀 Quick Deploy Guide

### Backend (Render)
1. Ve a [render.com](https://render.com)
2. Conecta tu cuenta de GitHub
3. Crea un nuevo **Web Service**
4. Selecciona el repositorio `astrenai`
5. Configura:
   - **Build Command**: `pip install --upgrade pip && pip install -r requirements.txt`
   - **Start Command**: `python src/star_api_render.py`
   - **Python Version**: `3.11.0`
6. Variables de Entorno:
   - `GROQ_API_KEY`: Tu API key de Groq (obtén una en https://console.groq.com/)
   - `PORT`: `8000`
   - `HOST`: `0.0.0.0`

### Frontend (Vercel)
1. Ve a [vercel.com](https://vercel.com)
2. Conecta tu cuenta de GitHub
3. Importa el repositorio `astrenai`
4. Configura:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Variables de Entorno:
   - `VITE_API_URL`: `https://tu-backend-render-url.onrender.com`

## 🔧 Local Development

### Backend
```bash
pip install -r requirements.txt
python src/star_api_render.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 📊 Project Status
- ✅ Clean project structure
- ✅ Optimized dependencies
- ✅ Ready for deployment
- ✅ Complete documentation
