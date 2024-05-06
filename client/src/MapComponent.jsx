// MapComponent.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import pingsData from './pings.json';

const MapComponent = () => {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {pingsData.map((ping, index) => (
        <Marker key={index} position={ping.position} icon={L.divIcon({ className: 'custom-marker', html: `<div style="background-color: ${ping.couleur}">${ping.nom}</div>` })}>
          <Popup>{ping.nom}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
