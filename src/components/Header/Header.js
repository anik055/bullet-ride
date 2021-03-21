import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import header from '../../images/bg.png';
// import logo from '../../images/logoo.jpg';
import logo from '../../images/lo.png'
import { UserContext } from '../../App';


const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div  style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${header})` }} className="header">
            <nav className="nav">
                <ul>
                    <li>
                        <img className="logo" src={logo} alt=""/>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link className="btn-book" to="/destination">Destination</Link>
                    </li>
                    {
                        loggedInUser.displayName || loggedInUser.name ? <li>
                        <Link className="btn-book" to="#">{loggedInUser.displayName || loggedInUser.name}</Link>
                    </li>
                     :<li>
                        <Link to="/login">Login</Link>
                    </li>
                    }
                    
                </ul>
            </nav>
        </div>
    );
};

export default Header;