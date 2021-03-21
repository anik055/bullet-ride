import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './vehicle.css'
const Vehicle = (props) => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // console.log(props);
    
    const {name, imgUrl} = props.room;
    
    // loggedInUser.vehicle = {name: name, imgUrl: imgUrl}
    // loggedInUser.vehicle = props;
    // console.log(loggedInUser);
    // setLoggedInUser(loggedInUser);
    return (
        <Link onClick={(e) =>{
            // console.log(loggedInUser);
            const newUser = loggedInUser;
            newUser.vehicle = {name: name, imgUrl: imgUrl};
            setLoggedInUser(newUser);
            // console.log(loggedInUser);
        }} className='vehicle' to={`/book/${name}`}>
            <img src={imgUrl} alt=""/>
            <h1>{name}</h1>
        </Link>
    );
};

export default Vehicle;