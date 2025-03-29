import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";
import axios from "axios";

const customIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});


const HospitalMap = () => {

    const [hospitals,setHospitals] = useState([]);

    const fetchHospitals = async()=>{
        try{
            const token = localStorage.getItem('token');
            const url = String(import.meta.env.VITE_BACKEND)+"/user/getNearbyLocation";
            const response = await axios.get(url,{
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            if(response.status === 200)
                setHospitals(response.data.data);
            else 
                setHospitals([]);
        }catch(err){
            console.error('Error at Hospital Fetch',err);
        }
    }

    useEffect(()=>{
        fetchHospitals();
    },[]);

  return (
    <MapContainer center={[16.7, 74.24]} zoom={13} style={{ height: "500px", width: "100%" }}>
      {/* OpenStreetMap Tile Layer */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Add Markers for each hospital */}
      {hospitals.map((hospital, index) => (
        <Marker key={index} position={[hospital.lat, hospital.lon]} icon={customIcon}>
          <Popup>{hospital.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default HospitalMap;
