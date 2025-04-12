import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock window.ResizeObserver
const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

// Mock window.L (Leaflet)
vi.stubGlobal('L', {
  map: vi.fn(),
  tileLayer: vi.fn(),
  marker: vi.fn(),
  Icon: {
    Default: {
      prototype: {
        _getIconUrl: vi.fn(),
      },
      mergeOptions: vi.fn(),
    },
  },
}); 