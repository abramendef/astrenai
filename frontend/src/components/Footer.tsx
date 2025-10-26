import { Star, Mail, Instagram, Twitter, ExternalLink } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-purple-600 fill-purple-600" />
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                  AstrenAI
                </span>
                <p className="text-xs text-gray-500 -mt-1">Inteligencia Artificial</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
              Tu compañera digital inteligente y empática. 
              Parte del ecosistema Astren.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white hover:bg-purple-50 transition-colors shadow-sm border border-gray-200 flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-gray-600" />
              </a>
              <a 
                href="#" 
                className="w-9 h-9 rounded-full bg-white hover:bg-purple-50 transition-colors shadow-sm border border-gray-200 flex items-center justify-center"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-gray-600" />
              </a>
              <a 
                href="mailto:astren.app@gmail.com" 
                className="w-9 h-9 rounded-full bg-white hover:bg-purple-50 transition-colors shadow-sm border border-gray-200 flex items-center justify-center"
                aria-label="Email"
              >
                <Mail className="w-4 h-4 text-gray-600" />
              </a>
            </div>
          </div>

          {/* Ecosistema */}
          <div className="space-y-6">
            <h3 className="font-semibold text-gray-900">Ecosistema Astren</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-2">
                  AstrenGPR <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-2">
                  AstrenAI <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-2">
                  AstrenGames <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-600 transition-colors flex items-center gap-2">
                  Sitio Principal <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Enlaces */}
          <div className="space-y-6">
            <h3 className="font-semibold text-gray-900">Enlaces</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#about" className="hover:text-purple-600 transition-colors flex items-center gap-2">
                  Sobre Star <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#capabilities" className="hover:text-purple-600 transition-colors flex items-center gap-2">
                  Capacidades <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#chat" className="hover:text-purple-600 transition-colors flex items-center gap-2">
                  Chat <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-purple-600 transition-colors flex items-center gap-2">
                  Roadmap <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-6">
            <h3 className="font-semibold text-gray-900">Contacto</h3>
            <div className="space-y-4">
              <a 
                href="mailto:astren.app@gmail.com" 
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-purple-600 transition-colors"
              >
                <Mail className="w-4 h-4" />
                astren.app@gmail.com
              </a>
              <div className="text-sm text-gray-500">
                <p>¿Tienes preguntas?</p>
                <p className="text-xs mt-1">Estamos aquí para ayudarte</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-500">
                © 2025 Astren. Todos los derechos reservados.
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Hecho con 💜 por el equipo de Astren
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 italic">
                "Reputación como métrica de valor"
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
