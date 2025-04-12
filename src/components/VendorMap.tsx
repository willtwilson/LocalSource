import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Vendor } from '../services/vendor.service';

interface VendorMapProps {
  latitude?: number;
  longitude?: number;
  name?: string;
  address?: string;
  className?: string;
  onVendorClick?: (vendor: Vendor) => void;
}

export const VendorMap: React.FC<VendorMapProps> = ({
  latitude = 49.2, // Default coordinates for Jersey
  longitude = -2.1,
  name,
  address,
  className = '',
  onVendorClick: _
}) => {
  useEffect(() => {
    // Create map instance
    const map = L.map('vendor-map').setView([latitude, longitude], 15);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Create custom marker icon
    const icon = L.icon({
      iconUrl: '/marker-icon.png',
      iconRetinaUrl: '/marker-icon-2x.png',
      shadowUrl: '/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    // Add marker with popup if name and address are provided
    if (name && address) {
      L.marker([latitude, longitude], { icon })
        .addTo(map)
        .bindPopup(`
          <strong>${name}</strong><br>
          ${address}
        `)
        .openPopup();
    }

    // Cleanup on unmount
    return () => {
      map.remove();
    };
  }, [latitude, longitude, name, address]);

  return (
    <div 
      id="vendor-map" 
      className={`w-full h-full rounded-lg shadow-md ${className}`}
      style={{ minHeight: '300px' }}
    />
  );
}; 