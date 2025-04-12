/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  const mockOnSearch = vi.fn();
  const categories = ['Restaurant', 'Farm', 'Market'];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with all elements', () => {
    render(<SearchBar onSearch={mockOnSearch} categories={categories} />);
    
    // Verify search input exists
    expect(screen.getByPlaceholderText('Search vendors...')).toBeInTheDocument();
    
    // Verify filter button exists (using svg icon not text)
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onSearch when typing in search box with debounce', async () => {
    render(<SearchBar onSearch={mockOnSearch} categories={categories} />);
    
    const searchInput = screen.getByPlaceholderText('Search vendors...');
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    
    // Check that onSearch is not called immediately due to debounce
    expect(mockOnSearch).not.toHaveBeenCalled();
    
    // Wait for debounce to complete
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith('test query', expect.anything());
    }, { timeout: 1000 });
  });

  it('shows filter panel when filter button is clicked', () => {
    render(<SearchBar onSearch={mockOnSearch} categories={categories} />);
    
    // Filter panel should be hidden initially
    expect(screen.queryByText('Category')).not.toBeInTheDocument();
    
    // Click filter button
    fireEvent.click(screen.getByRole('button'));
    
    // Filter panel should be visible
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Distance')).toBeInTheDocument();
    expect(screen.getByText('Rating')).toBeInTheDocument();
  });

  it('applies category filter when selected', async () => {
    render(<SearchBar onSearch={mockOnSearch} categories={categories} />);
    
    // Open filter panel
    fireEvent.click(screen.getByRole('button'));
    
    // Select a category
    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Farm' } });
    
    // Wait for debounce
    await waitFor(() => {
      expect(mockOnSearch).toHaveBeenCalledWith(expect.anything(), expect.objectContaining({
        category: 'Farm'
      }));
    }, { timeout: 1000 });
  });
}); 