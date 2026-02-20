import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Company location coordinates - EXACT
const COMPANY_LOCATION = {
  lat: 36.894213034918636,
  lng: 10.185918422150554,
  name: 'Appcon Technologies',
  address: 'Parc Technologique BP 130, Ariana 2088, Tunisia'
};

// Updated Google Maps link
const GOOGLE_MAPS_URL = 'https://maps.app.goo.gl/S1BTk5ifLPUD5M6Z8';

const customIcon = L.divIcon({
  className: 'custom-map-marker',
  html: `
    <div class="marker-pin">
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#c42b2b" stroke="#fff" stroke-width="2"/>
        <circle cx="12" cy="10" r="3" fill="#fff"/>
      </svg>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36]
});

function AppconButton() {
  const map = useMap();
  const btnRef = useRef(null);
  
  useEffect(() => {
    if (btnRef.current) {
      L.DomEvent.disableClickPropagation(btnRef.current);
    }
  }, []);
  
  const handleClick = () => {
    map.flyTo([COMPANY_LOCATION.lat, COMPANY_LOCATION.lng], 19, {
      duration: 1
    });
  };

  return (
    <button 
      ref={btnRef}
      className="map-appcon-btn"
      onClick={handleClick}
      title="Go to Appcon Technologies"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#c42b2b" stroke="#fff" strokeWidth="2"/>
        <circle cx="12" cy="10" r="3" fill="#fff"/>
      </svg>
    </button>
  );
}

export default function LocationMap() {
  return (
    <div className="location-map-wrapper">
      <MapContainer
        center={[COMPANY_LOCATION.lat, COMPANY_LOCATION.lng]}
        zoom={18}
        minZoom={5}
        maxZoom={21}
        scrollWheelZoom={true}
        className="location-map-container"
        zoomControl={true}
        preferCanvas={true}
      >
        {/* Google Satellite - Single layer for better performance */}
        <TileLayer
          url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
          maxZoom={21}
          maxNativeZoom={21}
        />

        <Marker position={[COMPANY_LOCATION.lat, COMPANY_LOCATION.lng]} icon={customIcon}>
          <Popup className="custom-popup">
            <div className="popup-content">
              <h4>{COMPANY_LOCATION.name}</h4>
              <p>{COMPANY_LOCATION.address}</p>
              <a 
                href={GOOGLE_MAPS_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="popup-directions"
              >
                Get Directions
              </a>
            </div>
          </Popup>
        </Marker>

        {/* Appcon Button */}
        <div className="map-custom-controls">
          <AppconButton />
        </div>
      </MapContainer>

      {/* Bottom Overlay */}
      <div className="location-map-overlay">
        <div className="location-map-info">
          <svg className="location-map-info-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#c42b2b" stroke="#fff" strokeWidth="1.5"/>
            <circle cx="12" cy="10" r="3" fill="#fff"/>
          </svg>
          <div className="location-map-text">
            <span className="location-map-name">{COMPANY_LOCATION.name}</span>
            <span className="location-map-address">{COMPANY_LOCATION.address}</span>
          </div>
        </div>
        
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="location-map-button"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="3 11 22 2 13 21 11 13 3 11"/>
          </svg>
          Get Directions
        </a>
      </div>
    </div>
  );
}
