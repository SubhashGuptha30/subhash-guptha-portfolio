
interface NavigationProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const Navigation = ({ activeSection, onSectionClick }: NavigationProps) => {
  const navItems = ['Home', 'About', 'Portfolio', 'Creative', 'Skills', 'Contact'];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-cyan-400">Subhash.dev</div>
          <div className="hidden md:flex space-x-8">
            {navItems.map(item => (
              <button 
                key={item} 
                onClick={() => onSectionClick(item.toLowerCase())} 
                className={`hover:text-cyan-400 transition-colors duration-300 ${
                  activeSection === item.toLowerCase() ? 'text-cyan-400' : 'text-gray-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
