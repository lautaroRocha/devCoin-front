// React
import React from 'react';

// Routes
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav>
            <div>
                <div>Logo</div>
                <div>
                    <div>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/wallet">Wallet</NavLink>
                        <NavLink to="/profile">Profile</NavLink>
                    </div>
                    <div>
                        <NavLink to="/settings">Settings</NavLink>
                        <div>Dark/Light</div>
                        <NavLink to="/login">Sign up</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
