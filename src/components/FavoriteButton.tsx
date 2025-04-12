import React, { useState } from 'react';
import { vendorService } from '../services/vendor.service';

interface FavoriteButtonProps {
  vendorId: string;
  initialFavorite: boolean;
  onToggle?: (isFavorite: boolean) => void;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  vendorId,
  initialFavorite,
  onToggle
}) => {
  const [isFavorite, setIsFavorite] = useState(initialFavorite);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = async () => {
    try {
      setIsAnimating(true);
      const newFavoriteStatus = await vendorService.toggleFavorite(vendorId);
      setIsFavorite(newFavoriteStatus);
      onToggle?.(newFavoriteStatus);
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
      // You might want to show a toast notification here
    } finally {
      setTimeout(() => setIsAnimating(false), 300); // Match animation duration
    }
  };

  return (
    <button
      onClick={handleClick}
      className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-colors"
      aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-6 w-6 transform transition-all duration-300 ${
          isAnimating ? 'scale-125' : 'scale-100'
        } ${isFavorite ? 'text-red-500' : 'text-gray-600'}`}
        fill={isFavorite ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}; 