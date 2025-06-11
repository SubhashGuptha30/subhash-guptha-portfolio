
import { useState, useEffect } from 'react';
import { Rocket, Stars } from 'lucide-react';

interface LoaderProps {
  message?: string;
  showProgress?: boolean;
}

const Loader = ({ message = "Loading", showProgress = false }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Animated dots for loading text
    const dotsInterval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Progress animation if enabled
    let progressInterval: NodeJS.Timeout;
    if (showProgress) {
      progressInterval = setInterval(() => {
        setProgress(prev => prev >= 100 ? 100 : prev + 2);
      }, 90);
    }

    return () => {
      clearInterval(dotsInterval);
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [showProgress]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 z-50 flex items-center justify-center">
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main loader content */}
      <div className="relative z-10 text-center">
        {/* Animated rocket */}
        <div className="relative mb-8">
          <div className="inline-block animate-bounce">
            <Rocket className="w-16 h-16 text-cyan-400 transform rotate-45" />
          </div>
        </div>
          
        {/* Loading spinner */}
        <div className="relative mb-6">
          <div className="w-16 h-16 mx-auto border-4 border-slate-700 border-t-cyan-400 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-12 h-12 mx-auto mt-2 border-2 border-slate-800 border-b-cyan-300 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>

        {/* Loading text */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-white mb-2">
            {message}{dots}
          </h2>
          <p className="text-cyan-400">Compiling my portfolio for you</p>
        </div>

        {/* Progress bar (if enabled) */}
        {showProgress && (
          <div className="w-64 mx-auto">
            <div className="bg-slate-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-blue-400 h-full transition-all duration-300 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-400 mt-2">{progress}%</p>
          </div>
        )}

        {/* Floating particles */}
        <div className="absolute -top-10 -left-10 w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-100"></div>
        <div className="absolute -top-5 right-5 w-1 h-1 bg-yellow-400 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-0 -right-5 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-5 -left-5 w-1 h-1 bg-cyan-300 rounded-full animate-bounce delay-700"></div>
      </div>
    </div>
  );
};

export default Loader;
