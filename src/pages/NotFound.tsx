
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Satellite } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden flex items-center justify-center">
      {/* Animated stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
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

      {/* Main content container */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-12">
          {/* Left side - Text content */}
          <div className="text-left">
            <h1 className="text-8xl font-bold text-yellow-400 mb-4">404</h1>
            <h2 className="text-4xl font-bold text-white mb-4">Whoops!</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-md">
              We can't seem to find the space you're looking for :(
            </p>
            <Button 
              onClick={() => window.location.href = '/'}
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Back to Home
            </Button>
          </div>

          {/* Right side - Satellite illustration */}
          <div className="relative">
            <div className="relative transform rotate-12 hover:rotate-6 transition-transform duration-500">
              <Satellite className="w-48 h-48 text-blue-400" />
              
              {/* Satellite details */}
              <div className="absolute top-8 left-12 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="absolute top-16 right-8 w-4 h-4 bg-blue-300 rounded-full animate-pulse delay-75"></div>
              <div className="absolute bottom-12 left-8 w-3 h-3 bg-green-400 rounded-full animate-pulse delay-150"></div>
            </div>

            {/* Orbital rings */}
            <div className="absolute inset-0 border-2 border-blue-400/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
            <div className="absolute inset-4 border border-blue-300/10 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
          </div>
        </div>
      </div>

      {/* Additional floating elements */}
      <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
      <div className="absolute top-40 right-32 w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
      <div className="absolute bottom-32 left-32 w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
    </div>
  );
};

export default NotFound;
