import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AboutStar from "@/components/AboutStar";
import Capabilities from "@/components/Capabilities";
import StarChat from "@/components/StarChat";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const Index = () => {
  // Asegurar que la página inicie desde arriba en todos los dispositivos
  useEffect(() => {
    // Múltiples métodos para asegurar que funcione en todos los dispositivos
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    // Para dispositivos móviles
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  }, []);

  return (
    <div className="min-h-screen" style={{ scrollBehavior: 'auto' }}>
      {/* Anchor invisible para forzar scroll al inicio */}
      <div id="top" className="absolute top-0 left-0 w-0 h-0" />
      <Header />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="about">
          <AboutStar />
        </section>
        <section id="capabilities">
          <Capabilities />
        </section>
        <section id="chat" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Chatea con Star
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Experimenta la inteligencia artificial de AstrenAI. Star está aquí para ayudarte, 
                responder tus preguntas y ser tu compañera digital.
              </p>
            </div>
            <StarChat />
          </div>
        </section>
        <section id="roadmap">
          <Roadmap />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
