import React, { Component } from 'react';
import AuthenticationService from './AuthenticationService.js';
import { Link } from 'react-router-dom';

class HeaderComponent extends Component {
    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <header className='container'>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark p-2 m-2  bg-info text-white shadow rounded-4'>
                    <div><a className='navbar-brand' href="https://www.linkedin.com/in/divyaprakashdp/" target="_blank">dp</a></div>
                    <ul className='navbar-nav'>
                        {isUserLoggedIn && <li>
                            <Link to="/welcome/dp" className='nav-link'> Home</Link>
                        </li>}
                        {isUserLoggedIn && <li>
                            <Link to="/todos" className='nav-link'>Todos</Link>
                        </li>}
                    </ul>

                    <ul className='navbar-nav navbar-collapse justify-content-end'>
                        {!isUserLoggedIn && <li>
                            <Link to="/login" className='nav-link'>Login</Link>
                        </li>}
                        {isUserLoggedIn && <li>
                            <Link to="/logout" onClick={AuthenticationService.logout} className='nav-link'>Logout</Link>
                        </li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default HeaderComponent;