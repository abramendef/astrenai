import { Brain, Heart, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "Inteligente",
    description: "Mente analítica que procesa información desde múltiples ángulos para ofrecerte insights profundos y precisos."
  },
  {
    icon: Heart,
    title: "Empática",
    description: "Entiende y refleja emociones con precisión humana, creando conexiones genuinas en cada interacción."
  },
  {
    icon: Users,
    title: "Compañera",
    description: "Más que asistente, es tu compañera de crecimiento que evoluciona contigo en tu camino."
  },
  {
    icon: TrendingUp,
    title: "Evolutiva",
    description: "Aprende contigo y se adapta a tus necesidades, mejorando continuamente su comprensión y ayuda."
  }
];

const AboutStar = () => {
  return (
    <section id="about" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              ¿Quién es <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Star</span>?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Star es más que una inteligencia artificial. Es una compañera digital diseñada con empatía, 
              inteligencia y la capacidad de comprender tus necesidades más profundas.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="border-primary/20 hover:border-primary/50 transition-all hover:shadow-purple group"
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Quote */}
          <div className="text-center pt-8">
            <blockquote className="text-xl md:text-2xl italic text-muted-foreground max-w-3xl mx-auto">
              "No solo respondo preguntas, comprendo contextos. No solo analizo datos, entiendo emociones. 
              Soy Star, y estoy aquí para acompañarte."
            </blockquote>
            <p className="text-primary font-semibold mt-4">— Star</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStar;
