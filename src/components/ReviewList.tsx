import React from 'react';
import { Review, ReviewStats } from '../services/vendor.service';

interface ReviewListProps {
  reviews: Review[];
  stats: ReviewStats;
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews, stats }) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Customer Reviews</h3>
          <div className="flex items-center">
            <span className="text-2xl font-bold mr-2">{stats.averageRating.toFixed(1)}</span>
            <span className="text-gray-500">({stats.totalReviews} reviews)</span>
          </div>
        </div>
        
        <div className="space-y-1">
          {[5, 4, 3, 2, 1].map(rating => {
            const count = stats.ratingDistribution[rating] || 0;
            const percentage = stats.totalReviews > 0 
              ? Math.round((count / stats.totalReviews) * 100) 
              : 0;
            
            return (
              <div key={rating} className="flex items-center text-sm">
                <span className="w-12">{rating} stars</span>
                <div className="flex-1 mx-2 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 rounded-full h-2" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="w-8 text-right">{percentage}%</span>
              </div>
            );
          })}
        </div>
      </div>
      
      {reviews.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No reviews yet. Be the first to review!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="border-b pb-4">
              <div className="flex justify-between mb-2">
                <span className="font-medium">{review.userName}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>
                      {i < review.rating ? '★' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}; 