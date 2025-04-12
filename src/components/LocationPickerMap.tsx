import React, { useState, useEffect, useRef, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L, { LatLngExpression, LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default Leaflet marker icon issue
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

interface LocationPickerMapProps {
  onLocationChange: (location: { lat: number; lng: number }) => void;
  initialPosition?: { lat: number; lng: number };
}

// Default center for Jersey
const defaultCenter: LatLngExpression = [49.2138, -2.1358];
const defaultZoom = 11;

function LocationMarker({ 
  position, 
  setPosition 
}: { 
  position: LatLng | null; 
  setPosition: (pos: LatLng) => void; 
}) {
  const markerRef = useRef<L.Marker>(null);

  // Update marker position and map view when position state changes
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom());
    }
  }, [position, map]);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [setPosition],
  );

  return position === null ? null : (
    <Marker 
      draggable={true} 
      eventHandlers={eventHandlers}
      position={position} 
      ref={markerRef}
    />
  );
}

const LocationPickerMap: React.FC<LocationPickerMapProps> = ({ onLocationChange, initialPosition }) => {
  const [markerPosition, setMarkerPosition] = useState<LatLng | null>(initialPosition ? new LatLng(initialPosition.lat, initialPosition.lng) : null);

  // Callback to parent component when marker position changes
  useEffect(() => {
    if (markerPosition) {
      onLocationChange({ lat: markerPosition.lat, lng: markerPosition.lng });
    }
  }, [markerPosition, onLocationChange]);

  return (
    <div className="h-64 w-full mb-4 border rounded-md overflow-hidden">
      <MapContainer center={initialPosition ? [initialPosition.lat, initialPosition.lng] : defaultCenter} zoom={defaultZoom} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={markerPosition} setPosition={setMarkerPosition} />
      </MapContainer>
      {!markerPosition && (
        <p className="text-sm text-muted-foreground mt-1 text-center">Click on the map to place a marker for the vendor's location.</p>
      )}
       {markerPosition && (
        <p className="text-sm text-muted-foreground mt-1 text-center">Drag the marker to adjust the location.</p>
      )}
    </div>
  );
};

export default LocationPickerMap; 