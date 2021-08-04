import React from 'react';
import { Link } from 'react-router-dom';
import "./ShowVehicleData.css";
const ShowVehicleData = (props) => {
    const { name, image } = props.vehicle;
    return (
        <Link to={"./booking/" + name}>
            <div className="info-container">
                <div className="img-div">
                    <img src={image} alt="" />
                </div>
                <div className="text">
                    <h4>{name}</h4>
                </div>
            </div>
        </Link>
    );
};

export default ShowVehicleData;