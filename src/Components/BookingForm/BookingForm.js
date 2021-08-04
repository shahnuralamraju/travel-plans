import { faUserFriends } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import "./BookingForm.css";
const BookingForm = (props) => {
    const {name,image1, image2, image3, tPrice1,tPrice2,tPrice3,seat1,seat2,seat3} = props.bookingInfo;
    const [journeyInfo, setJourneyInfo] = useState({});
    const [isSearch, setIsSearch] = useState(false);

    const handleBlur = (e) => {
        const newJourneyInfo = { ...journeyInfo };
        newJourneyInfo[e.target.name] = e.target.value;
        setJourneyInfo(newJourneyInfo);
    }

    const handleSubmit = (e) => {
        if (journeyInfo.pickFrom && journeyInfo.pickTo && journeyInfo.date) {
            setIsSearch(!isSearch);
        }
        // else {
        //     // alert("Please Filled the all required field");
        // }
    }

    return (
        <div className="form-container">

            {!isSearch ? <form className="journey-form" >
                <label htmlFor="pickFrom">Pick From</label>
                <input onBlur={handleBlur} type="text" name="pickFrom" placeholder="Pick Location" required />
                <label htmlFor="pickTo">Pick To</label>
                <input onBlur={handleBlur} type="text" name="pickTo" placeholder="Set Location" required />
                <label htmlFor="date">Journey Date</label>
                <input onBlur={handleBlur} type="date" name="date" required />
                <input onClick={handleSubmit} type="submit" value="Search" id="submit" />
            </form>
                :
                <div className="second-div">
                    <div className="div1">
                        <span className="span2"></span>
                        <span className="span1"></span>
                        <span className="span3"></span>
                        <span className="span4"></span>
                        <h5 className="pickFrom">{journeyInfo.pickFrom}</h5>
                        <h5>{journeyInfo.pickTo}</h5>
                        <h6 style={{marginLeft:"12px"}}>Date: {journeyInfo.date}</h6>
                    </div>
                    <div className="div2">
                        <div className="vehicle-div">
                            <img src={image1} alt="" />
                        </div>
                        <div className="text-div"><h5>{name} <FontAwesomeIcon icon={faUserFriends}/> {seat1}</h5></div>
                        <div className="price-div"><h5>${tPrice1}</h5></div>
                    </div>
                    <div className="div2">
                        <div className="vehicle-div">
                            <img src={image2} alt="" />
                        </div>
                        <div className="text-div"><h5>{name} <FontAwesomeIcon icon={faUserFriends}/> {seat2}</h5></div>
                        <div className="price-div"><h5>${tPrice2}</h5></div>
                    </div>
                    <div className="div2">
                        <div className="vehicle-div">
                            <img src={image3} alt="" />
                        </div>
                        <div className="text-div"><h5>{name} <FontAwesomeIcon icon={faUserFriends}/> {seat3}</h5></div>
                        <div className="price-div"><h5>${tPrice3}</h5></div>
                    </div>
                    
                </div>}

        </div>
    );

};

export default BookingForm;