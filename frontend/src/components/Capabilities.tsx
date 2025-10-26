import { Database, Zap, Shield, Sparkles, Network, Rocket } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const capabilities = [
  {
    icon: Database,
    title: "Análisis inteligente",
    description: "Procesa y analiza datos complejos desde múltiples perspectivas para ofrecerte insights valiosos."
  },
  {
    icon: Zap,
    title: "Asistencia personalizada",
    description: "Ayuda adaptada a tu estilo de trabajo y necesidades específicas de productividad."
  },
  {
    icon: Shield,
    title: "Comprensión emocional",
    description: "Detecta y responde a estados emocionales con empatía genuina y apoyo contextual."
  },
  {
    icon: Network,
    title: "Integración Astren",
    description: "Conectada con todo el ecosistema Astren para una experiencia completa y fluida."
  },
  {
    icon: Sparkles,
    title: "Aprendizaje continuo",
    description: "Evoluciona constantemente para mejorar su comprensión y la calidad de su asistencia."
  },
  {
    icon: Rocket,
    title: "Potenciación creativa",
    description: "Estimula tu creatividad y te ayuda a explorar nuevas perspectivas y soluciones."
  }
];

const Capabilities = () => {
  return (
    <section id="capabilities" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Capacidades de <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Star</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Star está equipada con múltiples capacidades diseñadas para ayudarte en cada aspecto 
              de tu desarrollo personal y profesional.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {capabilities.map((capability, index) => {
              const Icon = capability.icon;
              return (
                <Card 
                  key={index} 
                  className="border-primary/20 hover:border-primary/50 transition-all hover:shadow-purple hover:-translate-y-1"
                >
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{capability.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {capability.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center pt-8">
            <p className="text-lg text-muted-foreground mb-6">
              Y esto es solo el comienzo. Star continúa evolucionando para ofrecerte más.
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full">
              <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              <span className="text-primary font-semibold">En constante evolución</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
