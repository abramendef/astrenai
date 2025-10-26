import { Star, Sparkles, Brain, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToChat = () => {
    const element = document.getElementById("chat");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    const element = document.getElementById("about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-300/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Conoce a <span className="bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">Star</span>
                </h1>
                <p className="text-2xl md:text-3xl text-gray-600 font-medium">
                  La primera IA de AstrenAI
                </p>
              </div>

              <p className="text-lg text-gray-600 leading-relaxed max-w-xl">
                Tu compañera digital inteligente, empática y analítica. Star combina inteligencia artificial avanzada 
                con empatía humana. No es solo una IA, es tu compañera digital que te entiende, te guía y te ayuda a crecer.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all text-lg px-8 py-6"
                  onClick={scrollToChat}
                >
                  <Star className="w-5 h-5 mr-2" />
                  Chatear con Star
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6 border-purple-200 hover:bg-purple-50 hover:border-purple-300 text-gray-700"
                  onClick={scrollToAbout}
                >
                  Conoce más sobre Star
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">24/7</div>
                  <div className="text-sm text-gray-500 mt-1">Siempre disponible</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">∞</div>
                  <div className="text-sm text-gray-500 mt-1">Aprendizaje continuo</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">100%</div>
                  <div className="text-sm text-gray-500 mt-1">Empática</div>
                </div>
              </div>
            </div>

            {/* Right Content - Illustration */}
            <div className="relative">
              <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl">
                {/* Main Star */}
                <div className="relative">
                  <Star className="w-48 h-48 text-purple-600 fill-purple-600 animate-pulse" />
                  <div className="absolute inset-0 blur-2xl bg-purple-600/30 animate-pulse"></div>
                </div>

                {/* Floating Icons */}
                <Brain className="absolute top-8 right-8 w-12 h-12 text-purple-500 animate-bounce" style={{ animationDelay: "0s" }} />
                <Heart className="absolute top-16 left-8 w-10 h-10 text-pink-500 animate-bounce" style={{ animationDelay: "1s" }} />
                <Zap className="absolute bottom-16 right-12 w-8 h-8 text-yellow-500 animate-bounce" style={{ animationDelay: "2s" }} />
                <Sparkles className="absolute bottom-8 left-16 w-6 h-6 text-purple-400 animate-pulse" style={{ animationDelay: "0.5s" }} />

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-300 rounded-full blur-xl"></div>
                  <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-400 rounded-full blur-lg"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-500 rounded-full blur-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
