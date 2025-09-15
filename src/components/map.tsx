"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Location } from "../generated/prisma";

// Icono personalizado usando imágenes del CDN de Leaflet
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface MapProps {
  itineraries: Location[];
}

export default function Map({ itineraries }: MapProps) {
  const center: [number, number] =
    itineraries.length > 0 ? [itineraries[0].lat, itineraries[0].lng] : [0, 0];

  return (
    <div style={{ height: "500px", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={8}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {itineraries.map((location, i) => (
          <Marker
            key={i}
            position={[location.lat, location.lng]}
            title={location.locationTitle}
            icon={defaultIcon}
          >
            <Popup>{location.locationTitle}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
