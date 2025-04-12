import React from 'react';
import { Vendor } from '../services/vendor.service';

interface VendorCardProps {
  vendor: Vendor;
  onClick?: (vendor: Vendor) => void;
}

const VendorCard: React.FC<VendorCardProps> = ({ vendor, onClick }) => {
  return (
    <div 
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 cursor-pointer"
      onClick={() => onClick?.(vendor)}
    >
      <h3 className="font-semibold text-lg text-gray-900">{vendor.name}</h3>
      <p className="text-sm text-gray-600 mb-2">{vendor.category}</p>
      {vendor.description && (
        <p className="text-sm text-gray-700 line-clamp-2 mb-3">{vendor.description}</p>
      )}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>Status: Open</span>
        <span>Added: {new Date(vendor.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default VendorCard; 