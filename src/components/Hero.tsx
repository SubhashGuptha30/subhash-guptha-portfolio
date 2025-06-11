
import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onSectionClick: (sectionId: string) => void;
}

const Hero = ({ onSectionClick }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20 lg:py-0 px-6">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20"></div>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="space-y-2">
              <p className="text-cyan-400 text-lg">Hello, I'm</p>
              <h1 className="text-5xl lg:text-7xl font-bold">
                Subhash
                <span className="text-cyan-400 px-2 lg:px-4">Guptha</span>
              </h1>
              <div className="bg-cyan-400 text-gray-900 px-4 py-2 rounded-full inline-block">
                <span className="font-semibold">AI Developer</span>
              </div>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed">
              B.Tech AI student and tech enthusiast from Amrita Vishwa Vidyapeetham, 
              passionate about building intelligent solutions and creating seamless user experiences.
            </p>
            <div className="flex space-x-4">
              <Button 
                onClick={() => onSectionClick('portfolio')} 
                className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                View My Work <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => onSectionClick('contact')} 
                className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 px-8 py-3 rounded-lg transition-all duration-300"
              >
                Get In Touch
              </Button>
            </div>
          </div>
          <div className={`flex justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative group">
              <div className="w-80 h-80 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 p-1 transition-all duration-500 group-hover:scale-105 group-hover:rotate-y-12 group-hover:rotate-x-12 transform-gpu perspective-1000">
                <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-cyan-400/50">
                  <img 
                    alt="Subhash Guptha" 
                    className="w-72 h-72 rounded-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110" 
                    src="/lovable-uploads/519c0e2b-b038-4a33-abb9-9bfa8731c5aa.jpg"
                    style={{
                      transform: 'translateZ(20px)'
                    }}
                  />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-cyan-400 text-gray-900 px-4 py-2 rounded-full font-semibold transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-400/50">
                3rd Year B.Tech
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
