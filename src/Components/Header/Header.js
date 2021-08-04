import React from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <nav className="navbar navbar-expand-lg navbar-light nav-bar">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Travel Plans</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <span className="me-auto"></span>
                    <ul className="navbar-nav mb-2 mb-lg-0 list-item">
                        <li className="nav-item">
                            <Link className="nav-link  active" aria-current="page" to="/home">Home</Link>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link " to="/blog">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link " to="/contact">Contact</Link>
                        </li>
                        {loggedInUser.success && <li className="nav-item">
                            <Link id="displayName" className="nav-link"><b>{loggedInUser.name}</b></Link>
                        </li>}
                        {
                            loggedInUser.success ?
                                <li className="nav-item login">
                                    <Link onClick={() => setLoggedInUser({})} className="nav-link text-white">Sign Out</Link>
                                </li>
                                :
                                <li className="nav-item login">
                                    <Link className="nav-link text-white" to="/login">Login</Link>
                                </li>
                        }

                    </ul>

                </div>
            </div>
        </nav>
    );
};

export default Header;