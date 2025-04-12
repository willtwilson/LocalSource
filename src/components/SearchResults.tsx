import React from 'react';
import { Link } from 'react-router-dom';
import { Vendor } from '../services/vendor.service';

interface SearchResultsProps {
  vendors: Vendor[];
  total: number;
  loading: boolean;
  onLoadMore: () => void;
  hasMore: boolean;
}

export const SearchResults: React.FC<SearchResultsProps> = ({
  vendors,
  total,
  loading,
  onLoadMore,
  hasMore
}) => {
  if (loading && vendors.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (vendors.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No vendors found</p>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-600 mb-4">
        Found {total} vendor{total !== 1 ? 's' : ''}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vendors.map(vendor => (
          <Link
            key={vendor.id}
            to={`/vendors/${vendor.id}`}
            className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
          >
            <div className="relative h-48">
              {vendor.coverImage ? (
                <img
                  src={vendor.coverImage}
                  alt={vendor.name}
                  className="w-full h-full object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
              {vendor.averageRating > 0 && (
                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-md flex items-center">
                  <svg
                    className="h-4 w-4 text-yellow-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  <span className="ml-1 text-sm font-medium">
                    {vendor.averageRating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{vendor.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{vendor.category}</p>
              <p className="text-sm text-gray-500 line-clamp-2">
                {vendor.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
}; 