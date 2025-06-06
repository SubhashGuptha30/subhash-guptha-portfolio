
import { useState, useEffect } from 'react';
import { Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PageStatsData {
  page_views: number;
  likes: number;
}

const PageStats = () => {
  const [stats, setStats] = useState<PageStatsData>({ page_views: 0, likes: 0 });
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    // Initialize stats and increment page view
    initializeStats();
    
    // Check if user has already liked (using localStorage)
    const hasLiked = localStorage.getItem('portfolio_liked') === 'true';
    setIsLiked(hasLiked);
  }, []);

  const initializeStats = async () => {
    try {
      // For now, we'll use localStorage to simulate the stats
      // This will be replaced with Supabase once connected
      const storedStats = localStorage.getItem('portfolio_stats');
      if (storedStats) {
        const parsedStats = JSON.parse(storedStats);
        setStats(parsedStats);
        // Increment page view
        const newStats = { ...parsedStats, page_views: parsedStats.page_views + 1 };
        localStorage.setItem('portfolio_stats', JSON.stringify(newStats));
        setStats(newStats);
      } else {
        // Initialize with first view
        const initialStats = { page_views: 1, likes: 0 };
        localStorage.setItem('portfolio_stats', JSON.stringify(initialStats));
        setStats(initialStats);
      }
    } catch (error) {
      console.error('Error initializing stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      const newLikedState = !isLiked;
      const currentStats = JSON.parse(localStorage.getItem('portfolio_stats') || '{"page_views": 1, "likes": 0}');
      
      const newStats = {
        ...currentStats,
        likes: newLikedState ? currentStats.likes + 1 : Math.max(0, currentStats.likes - 1)
      };
      
      localStorage.setItem('portfolio_stats', JSON.stringify(newStats));
      localStorage.setItem('portfolio_liked', newLikedState.toString());
      
      setStats(newStats);
      setIsLiked(newLikedState);
    } catch (error) {
      console.error('Error toggling like:', error);
    } finally {
      setIsLiking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center space-x-6 text-gray-400">
        <div className="flex items-center space-x-2">
          <Eye className="w-5 h-5" />
          <span className="text-sm">Loading...</span>
        </div>
        <div className="flex items-center space-x-2">
          <Heart className="w-5 h-5" />
          <span className="text-sm">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-6">
      {/* Page Views Counter */}
      <div className="flex items-center space-x-2 text-gray-300">
        <Eye className="w-5 h-5 text-cyan-400" />
        <span className="text-sm font-medium">
          {stats.page_views.toLocaleString()} view{stats.page_views !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Like Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleLike}
        disabled={isLiking}
        className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-all duration-300 p-2"
      >
        <Heart 
          className={`w-5 h-5 transition-all duration-300 ${
            isLiked 
              ? 'fill-red-500 text-red-500 scale-110' 
              : 'text-cyan-400 hover:scale-110'
          }`} 
        />
        <span className="text-sm font-medium">
          {stats.likes.toLocaleString()} like{stats.likes !== 1 ? 's' : ''}
        </span>
      </Button>
    </div>
  );
};

export default PageStats;
