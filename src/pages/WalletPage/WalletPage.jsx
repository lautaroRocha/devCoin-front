import React, { useState } from 'react';
import { AppWrap } from '../../wrapper';

import { Balance, History, Transfer, Deposit } from '../../components';

const Wallet = () => {
    const [selectedView, setSelectedView] = useState('Balance');

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
    return (
        <div className="flex h-full w-full flex-col items-center">
            <h1 className="mt-6 text-6xl font-bold text-primary">WALLET</h1>
            <Deposit />
            <button className="mx-auto mt-3 w-fit rounded-lg bg-alternative p-2">COMPRAR</button>
            <ul className="mt-4 flex gap-6  text-sm font-bold text-white">
                <li
                    className="dark:bg-secodary/90 rounded-sm bg-secondary p-2 hover:cursor-pointer"
                    onClick={setView}
                >
                    Balance
                </li>
                <li
                    className="dark:bg-secodary/90 rounded-sm bg-secondary p-2 hover:cursor-pointer"
                    onClick={setView}
                >
                    Historial
                </li>
                <li
                    className="dark:bg-secodary/90 rounded-sm bg-secondary p-2 hover:cursor-pointer"
                    onClick={setView}
                >
                    Enviar
                </li>
            </ul>
            {view}
        </div>
    );
};

export default AppWrap(Wallet);
