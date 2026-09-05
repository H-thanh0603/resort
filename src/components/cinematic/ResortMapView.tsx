"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const dot = L.divIcon({
  className: "",
  html: `<span style="display:block;width:18px;height:18px;border-radius:9999px;background:#8c6d46;border:3px solid #f7f5f0;box-shadow:0 4px 16px rgba(0,0,0,.4)"></span>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

/** Bản đồ thật (OpenStreetMap): vịnh biệt lập Bãi Khem, Phú Quốc. */
export default function ResortMapView() {
  return (
    <MapContainer
      center={[10.0245, 104.0322]}
      zoom={13}
      scrollWheelZoom={false}
      className="h-80 w-full lg:h-96"
      style={{ background: "#e8e2d5" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[10.0245, 104.0322]} icon={dot}>
        <Popup>
          <b>Aura Sanctuary Bay</b>
          <br />
          Bãi Khem, Phú Quốc — vịnh biệt lập
        </Popup>
      </Marker>
    </MapContainer>
  );
}
