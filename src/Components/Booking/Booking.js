import React from 'react';
import { useParams } from 'react-router-dom';
import BookingForm from '../BookingForm/BookingForm';
import fakeBookingData from '../fakeBookingData/fakeBookingData.json'
import Map from '../Map/Map';
import "./Booking.css";
const Booking = () => {
    const {name} = useParams();
    const bookingInfo = fakeBookingData.find(vehicle => vehicle.name === name);
    return (
        <div className="booking">
            <div className="sub-booking">
                <div className="booking-formDiv">
                    <BookingForm bookingInfo={bookingInfo}/>
                </div>
                <div className="map-div">
                    <Map></Map>
                </div>
            </div>
        </div>
    );
};

export default Booking;