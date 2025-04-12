import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix Leaflet default icon issue in React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface Vendor {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  status: string;
}

interface VendorMapProps {
  supabase: any; // Using any to resolve type issues with Supabase client
}

const VendorMap: React.FC<VendorMapProps> = ({ supabase }) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Jersey is approximately centered at these coordinates
  const jerseyCenter = [49.2144, -2.1312];

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const { data, error } = await supabase
          .from('vendors')
          .select('*')
          .eq('status', 'approved');

        if (error) {
          throw new Error(error.message);
        }

        // Type assertion with explicit type checking
        const typedData = data?.filter((item: any) => item.latitude && item.longitude)
          .map((item: any) => ({
            id: item.id,
            name: item.name,
            description: item.description,
            latitude: item.latitude,
            longitude: item.longitude,
            status: item.status
          })) as Vendor[];
        
        setVendors(typedData || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, [supabase]);

  if (loading) {
    return <div>Loading vendors map...</div>;
  }

  if (error) {
    return <div>Error loading vendor locations: {error}</div>;
  }

  return (
    <div className="vendor-map-container">
      <h2>Local Vendors Map</h2>
      <div style={{ height: '500px', width: '100%', marginBottom: '2rem' }}>
        <MapContainer 
          center={[jerseyCenter[0], jerseyCenter[1]]} 
          zoom={11} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {vendors.map((vendor) => (
            <Marker 
              key={vendor.id} 
              position={[vendor.latitude, vendor.longitude]}
            >
              <Popup>
                <div>
                  <h3>{vendor.name}</h3>
                  <p>{vendor.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default VendorMap; 