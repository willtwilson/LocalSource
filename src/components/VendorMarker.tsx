import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Vendor } from '../services/vendor.service';

interface VendorMarkerProps {
  vendor: Vendor;
  onClick?: (vendor: Vendor) => void;
}

const VendorMarker: React.FC<VendorMarkerProps> = ({ vendor, onClick }) => {
  return (
    <Marker 
      position={[vendor.latitude, vendor.longitude]}
      eventHandlers={{
        click: () => onClick?.(vendor)
      }}
    >
      <Popup>
        <div className="p-2">
          <h3 className="font-semibold text-lg">{vendor.name}</h3>
          <p className="text-gray-600">{vendor.category}</p>
          {vendor.description && (
            <p className="text-sm mt-2">{vendor.description}</p>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

export default VendorMarker; 