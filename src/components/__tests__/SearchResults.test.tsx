import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { SearchResults } from '../SearchResults';
import { BrowserRouter } from 'react-router-dom';

// Mock data for testing
const mockVendors = [
  {
    id: '1',
    name: 'Test Vendor 1',
    description: 'This is a test vendor 1',
    address: '123 Test St',
    latitude: 49.1992,
    longitude: -2.1357,
    averageRating: 4.5,
    totalReviews: 10,
    category: 'Restaurant',
    contactInfo: { phone: '123-456-7890', email: 'test1@example.com', website: 'https://test1.com' },
    operatingHours: [],
    photos: ['photo1.jpg'],
    coverImage: 'cover1.jpg',
    createdAt: '2025-01-01',
    updatedAt: '2025-01-02',
    isFavorite: false
  },
  {
    id: '2',
    name: 'Test Vendor 2',
    description: 'This is a test vendor 2',
    address: '456 Test Ave',
    latitude: 49.2005,
    longitude: -2.1398,
    averageRating: 3.5,
    totalReviews: 5,
    category: 'Farm',
    contactInfo: { phone: '987-654-3210', email: 'test2@example.com', website: 'https://test2.com' },
    operatingHours: [],
    photos: ['photo2.jpg'],
    coverImage: 'cover2.jpg',
    createdAt: '2025-02-01',
    updatedAt: '2025-02-02',
    isFavorite: true
  }
];

// Helper to render component with router
const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('SearchResults', () => {
  it('renders loading state when loading is true and no vendors', () => {
    renderWithRouter(
      <SearchResults 
        vendors={[]} 
        total={0} 
        loading={true} 
        onLoadMore={vi.fn()} 
        hasMore={false} 
      />
    );
    
    // Check for spinner element without using role
    expect(document.querySelector('.animate-spin')).toBeInTheDocument();
  });
  
  it('renders empty state when no vendors and not loading', () => {
    renderWithRouter(
      <SearchResults 
        vendors={[]} 
        total={0} 
        loading={false} 
        onLoadMore={vi.fn()} 
        hasMore={false} 
      />
    );
    
    expect(screen.getByText('No vendors found')).toBeInTheDocument();
  });
  
  it('renders vendor cards correctly', () => {
    renderWithRouter(
      <SearchResults 
        vendors={mockVendors} 
        total={2} 
        loading={false} 
        onLoadMore={vi.fn()} 
        hasMore={false} 
      />
    );
    
    expect(screen.getByText('Test Vendor 1')).toBeInTheDocument();
    expect(screen.getByText('Test Vendor 2')).toBeInTheDocument();
    expect(screen.getByText('Restaurant')).toBeInTheDocument();
    expect(screen.getByText('Farm')).toBeInTheDocument();
  });
  
  it('calls onLoadMore when load more button is clicked', () => {
    const mockOnLoadMore = vi.fn();
    
    renderWithRouter(
      <SearchResults 
        vendors={mockVendors} 
        total={10} 
        loading={false} 
        onLoadMore={mockOnLoadMore} 
        hasMore={true} 
      />
    );
    
    const loadMoreButton = screen.getByRole('button', { name: /load more/i });
    expect(loadMoreButton).toBeInTheDocument();
    
    fireEvent.click(loadMoreButton);
    expect(mockOnLoadMore).toHaveBeenCalledTimes(1);
  });
  
  it('does not show load more button when hasMore is false', () => {
    renderWithRouter(
      <SearchResults 
        vendors={mockVendors} 
        total={2} 
        loading={false} 
        onLoadMore={vi.fn()} 
        hasMore={false} 
      />
    );
    
    expect(screen.queryByRole('button', { name: /load more/i })).not.toBeInTheDocument();
  });
}); 