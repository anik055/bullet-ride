import React from 'react';
import bus from '../../images/bus.png';
import car from '../../images/car.png';
import train from '../../images/train.png';
import bike from '../../images/bike.png';
import { useParams } from 'react-router';


const Ride = () => {
    const {bedType} = useParams();
    return (
        <div>
            <div className='bg-primary w-60 border rounded p-3'>
                <img className='my-2' src={bedType==='BUS' ? bus : bedType==='CAR' ? car : bedType === 'TRAIN' ? train : bike} alt=""/>
                <span>{bedType}</span>
                <span className="mx-2">$30</span>
            </div>
        </div>
    );
};

export default Ride;