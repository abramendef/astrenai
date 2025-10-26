import { Star, Menu, X, UserPlus, LogIn } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "./AuthModal";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      // Para el inicio, ir al top absoluto
      window.scrollTo({ top: 0, behavior: "smooth" });
      setIsMenuOpen(false);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white/98 backdrop-blur-[15px] z-50 transition-all duration-300" id="header">
      <nav className="h-[4.5rem] flex justify-between items-center container mx-auto px-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
          <div className="relative">
            <Star className="w-8 h-8 text-purple-600 fill-purple-600" />
            <div className="absolute inset-0 blur-lg bg-purple-600/20"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
              AstrenAI
            </span>
            <span className="text-xs text-gray-500 -mt-1">Inteligencia Artificial</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex gap-8">
            <li>
              <button 
                onClick={() => scrollToSection("hero")} 
                className="font-medium text-gray-600 hover:text-purple-600 transition-colors relative group"
              >
                Inicio
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("about")} 
                className="font-medium text-gray-600 hover:text-purple-600 transition-colors relative group"
              >
                Características
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("capabilities")} 
                className="font-medium text-gray-600 hover:text-purple-600 transition-colors relative group"
              >
                Capacidades
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("chat")} 
                className="font-medium text-gray-600 hover:text-purple-600 transition-colors relative group"
              >
                Chat
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("roadmap")} 
                className="font-medium text-gray-600 hover:text-purple-600 transition-colors relative group"
              >
                Roadmap
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-purple-600 transition-all group-hover:w-full"></span>
              </button>
            </li>
          </ul>
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <button 
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all duration-200 hover:-translate-y-0.5"
              onClick={() => window.location.href = '#/app'}
            >
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Ir a la App</span>
            </button>
          ) : (
            <>
              <button 
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-medium hover:bg-purple-600 hover:text-white transition-all duration-200 hover:-translate-y-0.5"
                onClick={() => setShowAuthModal(true)}
              >
                <UserPlus className="w-4 h-4" />
                <span className="hidden sm:inline">Registrarse</span>
              </button>
              <button 
                className="inline-flex items-center gap-2 px-4 py-2 bg-transparent text-gray-600 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 hover:-translate-y-0.5"
                onClick={() => setShowAuthModal(true)}
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Iniciar Sesión</span>
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 z-30 top-[4.5rem]"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed left-0 top-[4.5rem] w-full bg-white border-b border-gray-200 shadow-lg transition-all duration-300 z-40 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="container mx-auto px-4 py-6 space-y-6">
          <ul className="space-y-6">
            <li>
              <button 
                onClick={() => scrollToSection("hero")} 
                className="block w-full text-left text-lg font-medium text-gray-600 hover:text-purple-600 transition-colors"
              >
                Inicio
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("about")} 
                className="block w-full text-left text-lg font-medium text-gray-600 hover:text-purple-600 transition-colors"
              >
                Características
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("capabilities")} 
                className="block w-full text-left text-lg font-medium text-gray-600 hover:text-purple-600 transition-colors"
              >
                Capacidades
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("chat")} 
                className="block w-full text-left text-lg font-medium text-gray-600 hover:text-purple-600 transition-colors"
              >
                Chat
              </button>
            </li>
            <li>
              <button 
                onClick={() => scrollToSection("roadmap")} 
                className="block w-full text-left text-lg font-medium text-gray-600 hover:text-purple-600 transition-colors"
              >
                Roadmap
              </button>
            </li>
          </ul>
          
          <div className="pt-6 border-t border-gray-200 space-y-4">
            {user ? (
              <button 
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-all duration-200"
                onClick={() => window.location.href = '#/app'}
              >
                <Star className="w-4 h-4" />
                Ir a la App
              </button>
            ) : (
              <>
                <button 
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-white text-purple-600 border-2 border-purple-600 rounded-lg font-medium hover:bg-purple-600 hover:text-white transition-all duration-200"
                  onClick={() => setShowAuthModal(true)}
                >
                  <UserPlus className="w-4 h-4" />
                  Registrarse
                </button>
                <button 
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-transparent text-gray-600 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 hover:text-gray-900 transition-all duration-200"
                  onClick={() => setShowAuthModal(true)}
                >
                  <LogIn className="w-4 h-4" />
                  Iniciar Sesión
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </header>
  );
};

export default Header;
