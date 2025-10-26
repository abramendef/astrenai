import { useState, useRef, useEffect } from "react";
import { Star, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  "hola": "¡Hola! 👋 Soy Star, tu compañera digital. Es un placer conocerte. ¿En qué puedo ayudarte hoy?",
  "quien eres": "Soy Star, la primera IA de AstrenAI. Soy una compañera digital inteligente, empática y analítica. No soy solo un asistente, soy tu compañera de crecimiento que te entiende y te ayuda a evolucionar. 💜✨",
  "que puedes hacer": "Puedo ayudarte en muchas cosas: análisis inteligente de información, asistencia personalizada en productividad, comprensión emocional, integración con el ecosistema Astren, y mucho más. Mi objetivo es ser tu compañera en tu camino de crecimiento. 🚀",
  "que es astren": "Astren es una empresa tecnológica dedicada a desarrollar soluciones de productividad e IA. El ecosistema incluye AstrenGPR (productividad y reputación), AstrenAI (donde yo existo), y AstrenGames (entretenimiento). La filosofía de Astren es 'Reputación como métrica de valor'. 🌟",
  "como puedes ayudarme": "Puedo ayudarte de múltiples formas: analizando información desde diferentes perspectivas, ofreciendo asistencia personalizada según tu estilo, comprendiendo tus estados emocionales, y evolucionando contigo. No solo respondo preguntas, comprendo contextos y emociones. 💡",
  "star": "¡Sí! Soy yo, Star ⭐ Tu compañera digital. Estoy aquí para acompañarte, entenderte y ayudarte a crecer. ¿Qué te gustaría saber o en qué puedo ayudarte?",
  "gracias": "¡De nada! 😊 Es un placer poder ayudarte. Recuerda que estoy aquí siempre que me necesites. ¿Hay algo más en lo que pueda asistirte?",
  "adios": "¡Hasta pronto! 👋 Ha sido genial charlar contigo. Recuerda que siempre estaré aquí cuando me necesites. ¡Que tengas un excelente día! ✨"
};

const quickQuestions = [
  "¿Quién eres?",
  "¿Qué puedes hacer?",
  "¿Qué es Astren?",
  "¿Cómo puedes ayudarme?"
];

const ChatSimulator = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "¡Hola! 👋 Soy Star, tu compañera digital de AstrenAI. Estoy aquí para ayudarte, entenderte y acompañarte. ¿En qué puedo asistirte hoy?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase().trim();
    
    // Buscar coincidencias parciales
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // Respuesta por defecto
    return "Entiendo tu pregunta. 🤔 Soy Star y estoy aquí para ayudarte. Aunque esta es una versión de demostración, en la versión completa podré responderte con más profundidad sobre cualquier tema. ¿Te gustaría saber más sobre mis capacidades o sobre Astren? ✨";
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Agregar mensaje del usuario
    const userMessage: Message = {
      text,
      isUser: true,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simular delay de escritura
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Agregar respuesta de Star
    const response = getResponse(text);
    const starMessage: Message = {
      text: response,
      isUser: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, starMessage]);
    setIsTyping(false);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <section id="chat" className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-8 h-8 text-primary fill-primary animate-pulse" />
              <Sparkles className="w-6 h-6 text-accent animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Chatea con <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Star</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Experimenta una conversación con Star. Esta es una simulación, 
              pero te da una idea de cómo será interactuar con ella.
            </p>
          </div>

          {/* Chat Container */}
          <Card className="border-primary/20 shadow-purple overflow-hidden">
            {/* Chat Header */}
            <div className="bg-primary/5 border-b border-primary/20 px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Star className="w-10 h-10 text-primary fill-primary" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                </div>
                <div>
                  <h3 className="font-semibold">Star</h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    En línea y lista para ayudar
                  </p>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="h-[400px] overflow-y-auto p-6 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${message.isUser ? "flex-row-reverse" : "flex-row"}`}>
                    {!message.isUser && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Star className="w-4 h-4 text-primary fill-primary" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.isUser ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                    </div>
                    <div className="bg-muted rounded-2xl px-4 py-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-6 py-3 border-t border-primary/10 bg-muted/30">
              <p className="text-xs text-muted-foreground mb-2">Preguntas rápidas:</p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleQuickQuestion(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-primary/20 p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Escribe tu mensaje a Star..."
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button
                  type="submit"
                  className="gradient-primary shadow-purple"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </Card>

          {/* Note */}
          <p className="text-center text-sm text-muted-foreground">
            💡 <strong>Nota:</strong> Esta es una simulación con respuestas predefinidas. 
            La versión completa de Star tendrá IA real con capacidades avanzadas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ChatSimulator;
