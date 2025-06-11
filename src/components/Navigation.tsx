
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const Navigation = ({ activeSection, onSectionClick }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = ['Home', 'About', 'Portfolio', 'Skills', 'Certificates', 'Creative', 'Contact'];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (item: string) => {
    onSectionClick(item.toLowerCase());
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-cyan-400">Subhash.dev</div>
          
          {/* Menu Button */}
          <div>
            <button
              onClick={handleMenuToggle}
              className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        {isMenuOpen && (
          <div className="mt-4 bg-gray-800/95 rounded-lg border border-gray-700">
            {navItems.map((item, index) => (
              <div key={item}>
                <button
                  onClick={() => handleNavClick(item)}
                  className={`w-full text-left px-4 py-3 hover:text-cyan-400 transition-colors duration-300 ${
                    activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-gray-300'
                  }`}
                >
                  {item}
                </button>
                {index < navItems.length - 1 && (
                  <div className="border-b border-gray-600 mx-4"></div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
