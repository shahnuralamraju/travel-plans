import React from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import './Map.css'

function Map() {
   
    const center = {
        lat: 23.9675,
        lng: 91.1119
    };

    return (
        <LoadScript
            googleMapsApiKey="AIzaSyCwa9glekNby2789M5R1fXZ99uyeHgSa1I"
        >
            <GoogleMap
                mapContainerClassName="google-map"
                center={center}
                zoom={14}>
            </GoogleMap>
        </LoadScript>
    )
}

export default React.memo(Map)