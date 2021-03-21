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
        <div className="header">
            <nav className="nav">
                <ul className="container-fluid">
                    <li>
                        <img className="logo" src={logo} alt=""/>
                    </li>
                    <li className="text-dark text-decoration-none">
                        <Link className="text-dark text-decoration-none" to="/home">Home</Link>
                    </li>
                    <li>
                        <Link className="text-dark text-decoration-none" to="/destination">Destination</Link>
                    </li>
                    {
                        loggedInUser.displayName || loggedInUser.name ? <li>
                        <Link className="text-dark text-decoration-none" to="#">{loggedInUser.displayName || loggedInUser.name}</Link>
                    </li>
                     :<li>
                        <Link className="btn btn-danger" to="/login">Login</Link>
                    </li>
                    }
                    
                </ul>
            </nav>
            
            
        </div>
    );
};

export default Header;