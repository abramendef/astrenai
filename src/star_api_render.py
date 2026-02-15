from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
import uvicorn
import os
from star_groq import StarChatGroq

# Inicializar FastAPI
app = FastAPI(title="AstrenAI - Star API", version="1.0.0")

# Configurar CORS para permitir conexiones desde cualquier origen
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar dominios específicos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inicializar Star con Groq
print("Cargando Star con Groq API...")
star = StarChatGroq()
print("Star cargada y lista!")

# Modelos Pydantic
class ChatRequest(BaseModel):
    message: str
    max_length: int = 300

class ChatResponse(BaseModel):
    response: str
    status: str

# Endpoints
@app.get("/")
async def root():
    return {"message": "AstrenAI - Star API", "status": "running"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat_with_star(request: ChatRequest):
    try:
        response = star.chat(request.message, request.max_length)
        return ChatResponse(response=response, status="success")
    except Exception as e:
        print(f"Error en chat: {e}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "Star is ready"}

@app.head("/api/health")
async def health_check_head():
    return

# Servir archivos estáticos del frontend
if os.path.exists("public"):
    app.mount("/static", StaticFiles(directory="public"), name="static")
    
    @app.get("/{path:path}")
    async def serve_frontend(path: str):
        if path.startswith("api/"):
            return {"error": "API endpoint not found"}
        
        # Servir index.html para todas las rutas del frontend
        if os.path.exists("public/index.html"):
            return FileResponse("public/index.html")
        else:
            return {"error": "Frontend not built"}

if __name__ == "__main__":
    print("Iniciando AstrenAI - Star API con Groq")
    print("API disponible en: http://localhost:8000")
    print("=" * 50)
    
    # Configuración para Render
    port = int(os.environ.get("PORT", 8000))
    host = os.environ.get("HOST", "0.0.0.0")
    
    print(f"Iniciando servidor en {host}:{port}")
    
    uvicorn.run(
        app,
        host=host,
        port=port,
        reload=False,  # Desactivar reload en producción
        log_level="info"
    )
