import React, { useState } from 'react';

import map from '../../images/Map.png';
import './book.css'
import Ride from './Ride';

const Book = () => {
    let [pickFrom, setPickFrom] = useState('');
    let [pickTo, setPickTo] = useState('');
    let from;
    
    return (
        <div className="d-lg-flex">
            <div className="w-70 ml-5 my-1 p-5 form-group" >
            <div>
                <p>Pick from</p>
                <input className="p-3 my-2 form-control" onBlur={e => {
                    from = e.target.value
                    setPickFrom(e.target.value);
                    console.log(e.target.value);
                    pickFrom = e.target.value;
                    console.log(from);
                }} type="text" name="" id=""/>
                <p>Pick to</p>
                <input className="p-3 form-control" onBlur={e => {
                    setPickTo(e.target.value);
                }} type="text"/>
                <br/>
                <input className="form-control" type="date" id="birthday" name="birthday"></input>
                <br/>
                <button className="btn btn-primary">Search</button>
            </div>
            {pickFrom && pickTo && (
                <div>
                    <div className="my-3 rounded p-3 bg-warning">
                        <h3> {pickFrom}</h3>
                        <h6>to</h6>
                        <h3>{pickTo}</h3>
                    </div>
                    <div>
                        <Ride/>
                        <Ride/>
                        <Ride/>
                    </div>
                </div>
            ) }
        </div>
            <div >
                <img className="map w-70 h-50 my-5" src={map} alt=""/>

            </div>
        </div>
    );
};

export default Book;