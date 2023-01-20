import React, { useState, useContext, useEffect } from 'react';
import { AppWrap } from '../../wrapper';

import { userContext } from '../../context/userContext';
import { tokenContext } from '../../context/tokenContext';
import {Navigate } from 'react-router-dom';

import { Balance, History, Transfer, Deposit } from '../../components';

const Wallet = () => {

    const [selectedView, setSelectedView] = useState('Balance');

    const token = useContext(tokenContext)
    const user = useContext(userContext)

    function setView(e) {
        setSelectedView(e.target.textContent);
    }
    let view;


    switch (selectedView) {
        case 'Balance':
            view = <Balance />;
            break;
        case 'Historial':
            view = <History />;
            break;
        case 'Enviar':
            view = <Transfer />;
            break;
    }

    useEffect(() => {
        const viewBtns = document.querySelectorAll('#view-btn')
        viewBtns.forEach(btn => {
            if(btn.textContent === selectedView){
                btn.classList.add("bg-black")
            }else{
                btn.classList.remove("bg-black")
            }})
    }, [selectedView]);

    if(user && user.verified_user){
    return (
        <div className="flex h-full w-full flex-col items-center">
            <h1 className="mt-6 text-6xl font-bold text-primary dark:text-secondary">WALLET</h1>
            <Deposit />
            <button className="mx-auto mt-3 w-fit rounded-lg bg-alternative p-2">COMPRAR</button>
            <ul className="mt-4 flex gap-6  text-sm font-bold text-white">
                <li
                    className="dark:bg-secodary/90 rounded-sm bg-secondary p-2 hover:cursor-pointer"
                    onClick={setView} id="view-btn"
                >
                    Balance
                </li>
                <li
                    className="dark:bg-secodary/90 rounded-sm bg-secondary p-2 hover:cursor-pointer"
                    onClick={setView} id="view-btn"
                >
                    Historial
                </li>
                <li
                    className="dark:bg-secodary/90 rounded-sm bg-secondary p-2 hover:cursor-pointer"
                    onClick={setView} id="view-btn"
                >
                    Enviar
                </li>
            </ul>
            {view}
        </div>
    )}{return(
        <Navigate to="/login" replace={true}/>
    )}
};

export default AppWrap(Wallet);
