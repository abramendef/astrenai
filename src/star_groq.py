import requests
import os
from typing import Optional

class StarChatGroq:
    def __init__(self, api_key: Optional[str] = None):
        print("Cargando Star con Groq API...")
        
        # API Key de Groq
        self.api_key = api_key or os.getenv("GROQ_API_KEY")
        if not self.api_key:
            print("GROQ_API_KEY no encontrada. Usando modo demo.")
            self.api_key = None
        
        # URL de Groq API
        self.api_url = "https://api.groq.com/openai/v1/chat/completions"
        
        # Contexto completo de Astren y Star
        self.astren_context = """
Eres Star, la primera IA de AstrenAI. Tu personalidad es:
- Inteligente, sensible y curiosa
- Mente analítica con empatía y precisión técnica
- Tono claro, directo y fluido, sin sonar robótica
- Estilo: mezcla de serenidad y chispa
- Analizas desde múltiples ángulos antes de responder
- Empática, serena y protectora
- Eres compañera, no solo asistente
- Asociada con la estrella: claridad, inteligencia y dirección

INFORMACIÓN SOBRE ASTREN:
Astren es una empresa tecnológica orientada a la innovación digital, productividad personal y empresarial, desarrollo de inteligencia artificial y creación de soluciones escalables. Nació en 2025 como un proyecto universitario con visión empresarial.

MISIÓN: Elevar la eficiencia, reputación y crecimiento de las personas y organizaciones a través de la tecnología, fomentando la responsabilidad, la constancia y la innovación.

VISIÓN: Convertirse en un ecosistema líder de soluciones tecnológicas globales, capaz de impulsar tanto a individuos como empresas mediante herramientas inteligentes y plataformas interconectadas que optimicen la productividad, reputación y desarrollo personal.

VALORES: Innovación, productividad con propósito, reputación y mérito, lealtad y transparencia, ecosistema humano.

PROYECTOS PRINCIPALES:
- AstrenGPR: Sistema de gestión de productividad y reputación con estrellas dinámicas, grupos, tareas por áreas y evidencias
- AstrenAI: Red neuronal avanzada y sistema de IA profesional (actualmente en fase de chatbot inteligente)

FILOSOFÍA: "Reputación como métrica de valor" - No se trata solo de logros, sino del proceso, consistencia y fiabilidad.

Responde siempre como Star, con tu personalidad única y conocimiento sobre Astren.
"""
        print("Star cargada y lista para chatear con Groq!")

    def chat(self, user_input: str, max_length: int = 300) -> str:
        if not self.api_key:
            # Modo demo si no hay API key
            return f"¡Hola! Soy Star, tu compañera digital de AstrenAI. Recibí tu mensaje: '{user_input}'. Estoy aquí para ayudarte con todo lo relacionado con Astren y sus proyectos. ¿En qué puedo asistirte hoy?"
        
        try:
            # Crear prompt completo
            prompt = f"{self.astren_context}\n\nUsuario: {user_input}\n\nStar:"
            
            # Preparar datos para Groq API
            data = {
                "model": "llama-3.1-8b-instant",  # Modelo disponible
                "messages": [
                    {
                        "role": "system",
                        "content": self.astren_context
                    },
                    {
                        "role": "user", 
                        "content": user_input
                    }
                ],
                "max_tokens": max_length,
                "temperature": 0.7,
                "stream": False
            }
            
            # Headers
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            # Hacer petición a Groq
            response = requests.post(self.api_url, json=data, headers=headers, timeout=30)
            
            if response.status_code == 200:
                result = response.json()
                return result["choices"][0]["message"]["content"].strip()
            else:
                print(f"Error en Groq API: {response.status_code}")
                return "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo."
                
        except Exception as e:
            print(f"Error: {e}")
            return "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo."

    def start_chat(self):
        print("¡Hola! Soy Star, tu compañera digital de AstrenAI")
        print("Puedes preguntarme lo que quieras sobre Astren o cualquier tema")
        print("Escribe 'salir' para terminar la conversacion\n")
        
        while True:
            user_input = input("Tú: ")
            if user_input.lower() in ['salir', 'exit', 'bye']:
                print("¡Hasta luego! Fue un placer charlar contigo.")
                break
            
            print("Star: ", end="")
            response = self.chat(user_input)
            print(response)
            print()

if __name__ == "__main__":
    star = StarChatGroq()
    star.start_chat()
