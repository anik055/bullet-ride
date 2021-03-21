import React, { useEffect, useState } from 'react';
import Room from '../Room/Room';
import Vehicle from '../Vehicle/Vehicle';


import './home.css';
import vehiclesData from '../../fakedata/vehicles';

const Home = () => {
    const [vehicles, setVehicles] = useState([])
    useEffect(()=>{
        setVehicles(vehiclesData);
    },[])
    
    return (
        <div className="d-lg-flex vehicle-container" >
            {
                vehicles.map(room => <Vehicle key={room.id} room={room}></Vehicle>)
            }
        </div>
    );
};

export default Home;