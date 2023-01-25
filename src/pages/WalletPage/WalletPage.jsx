import React, { useState, useContext, useEffect } from 'react';
import { AppWrap } from '../../wrapper';

import { userContext, tokenContext } from '../../context';
import { Navigate } from 'react-router-dom';

import { Balance, History, Transfer, Deposit } from '../../components';

const Wallet = (props) => {
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

    if (user && user.verified_user) {
        return (
            <>
                <h1 className="mr-auto text-2xl font-bold">Wallet</h1>
                <div className="flex w-full flex-col items-center gap-8 overflow-hidden lg:grid lg:h-[70vh] lg:grid-cols-[420px,_1fr] lg:grid-rows-4 lg:gap-x-5">
                    <Deposit update={props.props.update} />
                    <div className="lg:items-left flex h-[50vh] flex-col items-center lg:col-start-1 lg:col-end-4 lg:row-start-2">
                        <ul className="mt-4 flex gap-6  text-sm font-bold text-white ">
                            <li
                                className="dark:bg-secodary/90 rounded-sm bg-secondary p-2 hover:cursor-pointer"
                                onClick={setView}
                                id="view-btn"
                            >
                                Balance
                            </li>
                            <li
                                className="dark:bg-secodary/90 rounded-sm bg-secondary p-2 hover:cursor-pointer"
                                onClick={setView}
                                id="view-btn"
                            >
                                Historial
                            </li>
                        </ul>
                        {view}
                    </div>
                    <Transfer className="lg:col-start-2" />
                </div>
            </>
        );
    }
    {
        return <Navigate to="/login" replace={true} />;
    }
};

export default AppWrap(Wallet);
