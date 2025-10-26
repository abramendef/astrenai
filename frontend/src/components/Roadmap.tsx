import { CheckCircle2, Circle, Rocket } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const phases = [
  {
    phase: "Fase 1",
    status: "current",
    title: "Star - Chatbot Inteligente",
    description: "IA conversacional con comprensión contextual, empatía y personalidad única.",
    features: [
      "Chat inteligente y empático",
      "Comprensión de contexto",
      "Personalidad definida de Star",
      "Respuestas adaptativas"
    ]
  },
  {
    phase: "Fase 2",
    status: "next",
    title: "Extensión Funcional",
    description: "Ampliación de capacidades con análisis avanzado e integración con Astren.",
    features: [
      "Análisis de datos complejo",
      "Integración con AstrenGPR",
      "Asistencia de productividad",
      "Gestión de tareas y reputación"
    ]
  },
  {
    phase: "Fase 3",
    status: "future",
    title: "IDE Inteligente Completo",
    description: "Entorno de desarrollo integral con IA que entiende código y asiste en programación.",
    features: [
      "Editor de código con IA",
      "Asistencia en desarrollo",
      "Debugging inteligente",
      "Generación de código contextual"
    ]
  }
];

const Roadmap = () => {
  return (
    <section id="roadmap" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Futuro de <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">AstrenAI</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Star es solo el comienzo. Descubre hacia dónde nos dirigimos en el desarrollo 
              de AstrenAI y cómo evolucionará para servirte mejor.
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-8">
            {phases.map((phase, index) => {
              const isActive = phase.status === "current";
              const isNext = phase.status === "next";
              const isFuture = phase.status === "future";

              return (
                <div key={index} className="relative">
                  {/* Connector Line */}
                  {index < phases.length - 1 && (
                    <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent md:left-8"></div>
                  )}

                  <Card className={`relative border-2 transition-all ${
                    isActive ? "border-primary shadow-purple" : 
                    isNext ? "border-accent/50 shadow-lg" : 
                    "border-border"
                  }`}>
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        {/* Status Icon */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isActive ? "bg-primary text-primary-foreground" :
                          isNext ? "bg-accent/20 text-accent" :
                          "bg-muted text-muted-foreground"
                        }`}>
                          {isActive ? (
                            <CheckCircle2 className="w-6 h-6" />
                          ) : (
                            <Circle className="w-6 h-6" />
                          )}
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              isActive ? "bg-primary/20 text-primary" :
                              isNext ? "bg-accent/20 text-accent" :
                              "bg-muted text-muted-foreground"
                            }`}>
                              {phase.phase}
                            </span>
                            {isActive && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-500">
                                Actual
                              </span>
                            )}
                            {isNext && (
                              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-500">
                                Próximo
                              </span>
                            )}
                          </div>
                          <CardTitle className="text-2xl mb-2">{phase.title}</CardTitle>
                          <CardDescription className="text-base">
                            {phase.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="ml-16 md:ml-20">
                        <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-muted-foreground">
                          Características principales:
                        </h4>
                        <ul className="space-y-2">
                          {phase.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-start gap-2">
                              <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                                isActive ? "text-primary" : "text-muted-foreground"
                              }`} />
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Bottom Note */}
          <div className="text-center pt-8">
            <p className="text-muted-foreground">
              Este roadmap es una visión general y puede evolucionar según las necesidades de nuestros usuarios.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
