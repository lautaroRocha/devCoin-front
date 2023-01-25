// React
import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../../context';
import * as Icons from '../../utils/icons';

// Routes
import { NavLink } from 'react-router-dom';

const Navbar = ({ logOut }) => {
    const savedMode = sessionStorage.getItem('mode');

    const [theme, setTheme] = useState(savedMode);
    const user = useContext(userContext);

    const documentClass = document.documentElement.classList;

    useEffect(() => {
        theme === 'dark' ? documentClass.add('dark') : documentClass.remove('dark');
        sessionStorage.setItem('mode', theme);
    }, [theme]);

    const handleThemeSwitch = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <nav className="fixed top-0 h-screen min-w-[4rem] bg-gradient-to-b from-indigo-600 via-zinc-900 to-zinc-900 text-white dark:bg-primary xl:w-[15%] 1700:w-[12%]">
            <div className="mt-12 flex h-[85%] flex-col justify-between">
                <div className="relative flex basis-1 justify-center text-center">
                    <span className="z-[1] xl:scale-125">{Icons.D}</span>
                    <span className="absolute -top-[1.3rem] z-0 text-7xl text-alternative xl:scale-110">
                        ||
                    </span>
                </div>

                <div className="mx-auto flex w-[95%] basis-3 flex-col items-center gap-4 xl:items-start">
                    <NavLink to="/" className="navbar-links flex gap-x-6" activeclassname="active">
                        {Icons.home}
                        <span className="hidden xl:flex">Inicio</span>
                    </NavLink>
                    {user && (
                        <>
                            <NavLink
                                to="/wallet"
                                className="navbar-links flex gap-x-6"
                                activeclassname="active"
                            >
                                {Icons.wallet}
                                <span className="hidden xl:flex">Cartera</span>
                            </NavLink>
                            <NavLink
                                to="/profile"
                                className="navbar-links flex gap-x-6"
                                activeclassname="active"
                            >
                                {Icons.profile}
                                <span className="hidden xl:flex">Perfil</span>
                            </NavLink>
                        </>
                    )}
                    <NavLink
                        to="/convert"
                        className="navbar-links flex gap-x-6"
                        activeclassname="active"
                    >
                        {Icons.convert}
                        <span className="hidden xl:flex">Conversor</span>
                    </NavLink>
                </div>
                <div className="flex  basis-1 flex-col items-center gap-4 xl:mt-32 xl:items-start">
                    <div className="flex w-[90%] gap-x-6 py-2 xl:px-4">
                        {theme === 'light' ? Icons.moon : Icons.sun}
                        <label className="switch max-xl:mx-auto">
                            <input type="checkbox" onClick={handleThemeSwitch} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                    {!user ? (
                        <NavLink
                            to="/login"
                            className="navbar-links flex gap-x-6"
                            activeclassname="active"
                        >
                            {Icons.logIn}
                            <span className="hidden whitespace-nowrap xl:flex">Iniciar sesión</span>
                        </NavLink>
                    ) : (
                        <div className="navbar-links flex gap-x-6">
                            {Icons.logOut}
                            <span onClick={logOut} className="hidden whitespace-nowrap xl:flex">
                                Cerrar sesión
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
