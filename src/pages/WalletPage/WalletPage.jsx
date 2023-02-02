import React, { useState, useContext } from 'react';
import { AppWrap } from '../../wrapper';
import { sessionContext } from '../../context';
import { Navigate } from 'react-router-dom';
import { Wallet, TransferHistory, Transfer, Deposit } from '../../components';

const WalletPage = (props) => {
    const { user } = useContext(sessionContext);

    const [selectedView, setSelectedView] = useState('Transferencias');

    function setView(e) {
        setSelectedView(e.target.textContent);
    }
    let view;

    switch (selectedView) {
        case 'Billetera':
            view = <Wallet />;
            break;
        case 'Transferencias':
            view = <TransferHistory />;
            break;
    }

    if (user && user.verified_user) {
        return (
            <>
                <h1 className="mr-auto mb-4 text-2xl font-bold lg:mb-8">Cartera</h1>
                <div className="flex w-full flex-col items-center gap-y-[3rem] overflow-visible lg:grid lg:h-fit lg:grid-cols-[420px,_1fr] lg:grid-rows-[10rem,_1fr] lg:gap-x-4 lg:gap-y-[2rem]">
                    <Deposit update={props.props.update} />
                    <hr className="hidden w-full rounded-md border-black/30 dark:border-white/30 max-lg:flex" />
                    <div className="lg:items-left flex h-fit w-full flex-col items-center lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:h-full">
                        <ul className="flex flex-col gap-y-4 text-center text-sm font-bold text-white transition-colors dark:text-black 500:flex-row 500:gap-x-6">
                            <li
                                className={`rounded-md px-4 py-2 hover:cursor-pointer 350:px-12 ${
                                    selectedView == 'Billetera'
                                        ? 'bg-secondary/90 text-white'
                                        : 'bg-[#242631] dark:bg-white/90'
                                }`}
                                onClick={setView}
                                id="view-btn"
                            >
                                Billetera
                            </li>
                            <li
                                className={`rounded-md px-4 py-2 hover:cursor-pointer 350:px-12 ${
                                    selectedView == 'Transferencias'
                                        ? 'bg-secondary/90 text-white'
                                        : 'bg-[#242631] dark:bg-white/90'
                                }`}
                                onClick={setView}
                                id="view-btn"
                            >
                                Transferencias
                            </li>
                        </ul>
                        {view}
                    </div>
                    <Transfer className="lg:col-start-2 lg:grid" update={props.props.update} socket={props.props.socket} />
                </div>
            </>
        );
    } else {
        return <Navigate to="/" replace={true} />;
    }
};

export default AppWrap(WalletPage);
