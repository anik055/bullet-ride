import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './vehicle.css'
const Vehicle = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    const {name, imgUrl} = props.room;
    return (
        <div className='w-50 card vehicle'>
            <Link onClick={(e) =>{
            const newUser = loggedInUser;
            newUser.vehicle = {name: name, imgUrl: imgUrl};
            setLoggedInUser(newUser);
        }}  to={`/book/${name}`}>
            <img src={imgUrl} alt=""/>
            <h1 className="vehicle-name">{name}</h1>
        </Link>
        </div>
    );
};

export default Vehicle;