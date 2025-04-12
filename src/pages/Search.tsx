import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SearchBar, SearchFilters } from '../components/SearchBar';
import { SearchResults } from '../components/SearchResults';
import NavigationMenu from '../components/NavigationMenu';
import { vendorService, Vendor } from '../services/vendor.service';

interface SearchState {
  vendors: Vendor[];
  total: number;
  loading: boolean;
  page: number;
  hasMore: boolean;
  categories: string[];
}

export const Search: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [state, setState] = useState<SearchState>({
    vendors: [],
    total: 0,
    loading: true,
    page: 1,
    hasMore: false,
    categories: []
  });

  // Get user's location
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await vendorService.getVendorCategories();
        setState(prev => ({ ...prev, categories }));
      } catch (error) {
        console.error('Failed to load categories:', error);
      }
    };

    loadCategories();
  }, []);

  // Parse URL search params
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const q = searchParams.get('q') || '';
    const category = searchParams.get('category') || undefined;
    const maxDistance = searchParams.get('maxDistance')
      ? Number(searchParams.get('maxDistance'))
      : undefined;
    const minRating = searchParams.get('minRating')
      ? Number(searchParams.get('minRating'))
      : undefined;
    const sortBy = (searchParams.get('sortBy') as SearchFilters['sortBy']) || undefined;

    setQuery(q);
    setFilters({ category, maxDistance, minRating, sortBy });
  }, [location.search]);

  // Perform search when query, filters, or user location changes
  useEffect(() => {
    const performSearch = async (isLoadMore = false) => {
      setState(prev => ({ ...prev, loading: true }));

      try {
        const result = await vendorService.searchVendors(
          query,
          filters,
          userLocation?.latitude,
          userLocation?.longitude,
          isLoadMore ? state.page : 1
        );

        setState(prev => ({
          ...prev,
          vendors: isLoadMore ? [...prev.vendors, ...result.vendors] : result.vendors,
          total: result.total,
          loading: false,
          hasMore: result.vendors.length === 10
        }));
      } catch (error) {
        console.error('Search failed:', error);
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    performSearch();
  }, [query, filters, userLocation]);

  // Update URL when search params change
  useEffect(() => {
    const searchParams = new URLSearchParams();
    if (query) searchParams.set('q', query);
    if (filters.category) searchParams.set('category', filters.category);
    if (filters.maxDistance) searchParams.set('maxDistance', String(filters.maxDistance));
    if (filters.minRating) searchParams.set('minRating', String(filters.minRating));
    if (filters.sortBy) searchParams.set('sortBy', filters.sortBy);

    navigate(`/search?${searchParams.toString()}`, { replace: true });
  }, [query, filters, navigate]);

  const handleSearch = (newQuery: string, newFilters: SearchFilters) => {
    setQuery(newQuery);
    setFilters(newFilters);
    setState(prev => ({ ...prev, page: 1 }));
  };

  const handleLoadMore = () => {
    setState(prev => ({ ...prev, page: prev.page + 1 }));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavigationMenu />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <SearchBar
          onSearch={handleSearch}
          categories={state.categories}
          className="mb-8"
        />
        <SearchResults
          vendors={state.vendors}
          total={state.total}
          loading={state.loading}
          onLoadMore={handleLoadMore}
          hasMore={state.hasMore}
        />
      </div>
    </div>
  );
}; 