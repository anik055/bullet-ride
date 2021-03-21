import React from 'react';
import bus from '../../images/bus.png';
import car from '../../images/car.png';
import train from '../../images/train.png';
import bike from '../../images/bike.png';
import { useParams } from 'react-router';


const Ride = () => {
    const {vehicleType} = useParams();
    return (
        <div>
            <div className='bg-primary w-60 border rounded p-3'>
                <img className='my-2' src={vehicleType==='BUS' ? bus : vehicleType==='CAR' ? car : vehicleType === 'TRAIN' ? train : bike} alt=""/>
                <span>{vehicleType}</span>
                <span className="mx-2">$30</span>
            </div>
        </div>
    );
};

export default Ride;