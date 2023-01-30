import React, { useState, useContext, useEffect } from 'react';
import { AppWrap } from '../../wrapper';
import { sessionContext } from '../../context';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { Balance, History, Transfer, Deposit } from '../../components';

const Wallet = (props) => {
    const [selectedView, setSelectedView] = useState('Historial');

    const {user} = useContext(sessionContext);

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
                <div className="flex w-full flex-col items-center gap-y-[3rem] overflow-visible lg:grid lg:h-[70vh] lg:grid-cols-[420px,_1fr] lg:grid-rows-[10rem,_1fr] lg:gap-y-[2rem] lg:gap-x-5">
                    <Deposit update={props.props.update} />
                    <div className="lg:items-left flex h-fit flex-col items-center lg:col-span-2 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:h-[50vh] lg:-translate-y-[7rem] lg:justify-items-center">
                        <ul className="flex gap-6 text-sm font-bold text-white ">
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
                    <Transfer className="lg:col-start-2" update={props.props.update}/>
                </div>
            </>
        );
    }else{  
        toast.error('Debes estar verificado para ingresar')
        return <Navigate to="/login" replace={true} />;
    }
};

export default AppWrap(Wallet);
