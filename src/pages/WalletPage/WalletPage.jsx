import React, { useState, useContext, useEffect } from 'react';
import { AppWrap } from '../../wrapper';

import { userContext } from '../../context/userContext';
import { tokenContext } from '../../context/tokenContext';
import { Navigate } from 'react-router-dom';

import { Balance, History, Transfer, Deposit } from '../../components';

const Wallet = () => {
    const [selectedView, setSelectedView] = useState('Historial');

    const token = useContext(tokenContext);
    const user = useContext(userContext);

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
    }

    useEffect(() => {
        const viewBtns = document.querySelectorAll('#view-btn');
        viewBtns.forEach((btn) => {
            if (btn.textContent === selectedView) {
                btn.classList.add('bg-alternative');
            } else {
                btn.classList.remove('bg-alternative');
            }
        });
    }, [selectedView]);

    if(user && user.verified_user){
    return (
        <>
            <h1 className="text-2xl font-bold mr-auto">Wallet</h1>
            <div className='flex flex-col gap-8 items-center w-full lg:grid lg:grid-cols-4 lg:gap-9 lg:grid-rows-4 lg:h-[70vh] overflow-hidden'>
                <Deposit />
                <div className='h-[50vh] flex flex-col items-center lg:items-left lg:col-start-1 lg:col-end-4 lg:row-start-2'>
                    <ul className="mt-4 flex gap-6  text-sm font-bold text-white ">
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
                    </ul>
                    {view}
                </div>
                <Transfer className="lg:col-start-2"/>
            </div>
        </>
    )}{return(
        <Navigate to="/login" replace={true}/>
    )}
};

export default AppWrap(Wallet);
