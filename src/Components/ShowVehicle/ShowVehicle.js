import React, { useEffect, useState } from 'react';
import "./ShowVehicle.css";
import fakeBookingData from '../fakeBookingData/fakeBookingData.json';
import ShowVehicleData from '../ShowVehicleData/ShowVehicleData';

const ShowVehicle = () => {
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        setVehicles(fakeBookingData)
    }, [])
    return (
        
        <div className="vehicle-container">
            
            {
                vehicles.map(vehicle => <ShowVehicleData vehicle={vehicle} key={vehicle.id}></ShowVehicleData>)
            }
        </div>
    );
};

export default ShowVehicle;