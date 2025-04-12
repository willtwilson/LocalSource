import React, { useEffect, useState } from 'react';
import { Vendor, VendorFilter, vendorService } from '../services/vendor.service';
import VendorCard from './VendorCard';

interface VendorListProps {
  className?: string;
  onVendorClick?: (vendor: Vendor) => void;
}

const VendorList: React.FC<VendorListProps> = ({ className = '', onVendorClick }) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [vendorTypes, setVendorTypes] = useState<{ id: string; name: string }[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    const loadVendorTypes = async () => {
      try {
        const types = await vendorService.getVendorTypes();
        setVendorTypes(types);
      } catch (error) {
        console.error('Error loading vendor types:', error);
      }
    };

    loadVendorTypes();
  }, []);

  useEffect(() => {
    const loadVendors = async () => {
      setLoading(true);
      try {
        const filter: VendorFilter = {};

        if (searchTerm) {
          filter.search = searchTerm;
        }

        if (selectedType) {
          filter.type = selectedType;
        }

        const data = await vendorService.getVendors(filter);
        setVendors(data);
      } catch (error) {
        console.error('Error loading vendors:', error);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search to avoid too many API calls
    const timeoutId = setTimeout(loadVendors, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedType]);

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <div className="bg-white border-b p-4 space-y-3">
        <input
          type="text"
          placeholder="Search vendors..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          {vendorTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : vendors.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-lg">No vendors found</p>
            <p className="text-sm">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {vendors.map(vendor => (
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                onClick={onVendorClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorList; 