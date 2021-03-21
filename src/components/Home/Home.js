import React from 'react';
import Room from '../Room/Room';
import Vehicle from '../Vehicle/Vehicle';
import bus from '../../images/bus.png';
import car from '../../images/car.png';
import train from '../../images/train.png';
import bike from '../../images/bike.png';

import './home.css';

const Home = () => {
    const style = {
        display: 'flex',
        margin: '40px',
        justifyContent: 'space-between'
    }
    const rooms = [
        {
            id: 1,
            name: 'BIKE',
            imgUrl: bike,
        },
        {
            id:2,
            name: 'CAR',
            imgUrl: car,
        },
        {
            id:3,
            name: 'BUS',
            imgUrl: bus,
        },
        {
            id:4,
            name: 'TRAIN',
            imgUrl: train,
        }
    ]
    return (
        <div style={style}>
            {
                rooms.map(room => <Vehicle key={room.id} room={room}></Vehicle>)
            }
        </div>
    );
};

export default Home;