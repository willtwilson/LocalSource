/* eslint-disable @typescript-eslint/no-unused-vars */
import { render } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { VendorMap } from '../VendorMap';

// Mock Leaflet's DOM manipulation
vi.mock('leaflet', async () => {
  const L = {
    Icon: {
      Default: {
        prototype: {
          _getIconUrl: vi.fn(),
        },
        mergeOptions: vi.fn(),
      },
    },
  };
  return { default: L, ...L };
});

// Mock react-leaflet components
vi.mock('react-leaflet', () => ({
  MapContainer: ({ children, className }: any) => (
    <div className={`leaflet-container ${className || ''}`}>{children}</div>
  ),
  TileLayer: () => null,
  ZoomControl: () => null,
  Marker: () => null,
  Popup: () => null,
}));

describe('VendorMap', () => {
  const defaultProps = {
    latitude: 49.2,
    longitude: -2.1,
    name: 'Test Vendor',
    address: '123 Test St'
  };

  it('renders without crashing', () => {
    const { container } = render(<VendorMap {...defaultProps} />);
    expect(container.querySelector('.leaflet-container')).toBeTruthy();
  });

  it('applies custom className when provided', () => {
    const { container } = render(<VendorMap {...defaultProps} className="custom-class" />);
    const mapContainer = container.querySelector('.leaflet-container');
    expect(mapContainer?.classList.contains('custom-class')).toBe(true);
  });
}); 