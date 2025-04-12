import React, { useState } from 'react';
import { VendorMap } from '../components/VendorMap';
import VendorList from '../components/VendorList';
import NavigationMenu from '../components/NavigationMenu';
import { Vendor } from '../services/vendor.service';

type ViewMode = 'map' | 'list';

const DiscoveryPage: React.FC = () => {
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('map');

  const handleVendorClick = (vendor: Vendor) => {
    setSelectedVendor(vendor);
  };

  return (
    <div className="flex flex-col h-screen">
      <NavigationMenu />
      
      <header className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Discover Local Vendors</h1>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'map'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setViewMode('map')}
            >
              Map View
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-1 relative">
        <div className="absolute inset-0">
          {viewMode === 'map' ? (
            <VendorMap onVendorClick={handleVendorClick} />
          ) : (
            <VendorList onVendorClick={handleVendorClick} />
          )}
        </div>
      </main>

      {selectedVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
            <h2 className="text-2xl font-semibold mb-2">{selectedVendor.name}</h2>
            <p className="text-gray-600 mb-4">{selectedVendor.category}</p>
            {selectedVendor.description && (
              <p className="text-gray-700 mb-4">{selectedVendor.description}</p>
            )}
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                onClick={() => setSelectedVendor(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscoveryPage; 