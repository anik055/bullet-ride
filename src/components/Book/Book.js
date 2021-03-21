import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import bus from '../../images/bus.png';
import car from '../../images/car.png';
import train from '../../images/train.png';
import bike from '../../images/bike.png';

const Book = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let [pickFrom, setPickFrom] = useState('');
    let [pickTo, setPickTo] = useState('');
    let from;
    


    const {bedType} = useParams();
    // console.log(img);
    // console.log(`../../images/${bedType}.png`);
    // console.log(loggedInUser);
    // const handleClick = () => {
    //     return (
    //         {}
    //     )
    // }
    // const {name, imgUrl} = loggedInUser.vehicle;
    return (
        <div style={{textAlign: 'center'}}>
            <div>
                <p>pick from</p>
                <input onBlur={e => {
                    from = e.target.value
                    setPickFrom(e.target.value);
                    console.log(e.target.value);
                    pickFrom = e.target.value;
                    console.log(from);
                }} type="text" name="" id=""/>
                <p>pick to</p>
                <input onBlur={e => {
                    setPickTo(e.target.value);
                }} type="text"/>
                <br/>
                <button>search</button>
            </div>
            {pickFrom && pickTo && (
                <div>
                    <div>
                <h1> {pickFrom} to {pickTo}</h1>
            </div>
            <div>
            <img src={bedType==='BUS' ? bus : bedType==='CAR' ? car : bedType === 'TRAIN' ? train : bike} alt=""/>
            <p>{bedType}</p>
            </div>
                </div>
            ) }
            <div>
            </div>
            

        </div>
    );
};

export default Book;