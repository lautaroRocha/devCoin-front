import React, {useState} from 'react';

import {Balance, History, Transfer, Deposit} from '../../components'

const Wallet = () => {

    const [selectedView, setSelectedView] = useState('Balance')
  
    function setView(e){
        setSelectedView(e.target.textContent)
    }
    let view;

    switch(selectedView){
        case 'Balance':
            view = <Balance />
            break;
        case 'Historial':
            view = <History />
            break;
        case 'Enviar':
            view = <Transfer/>
            break;
    }
    return (
        <div className='flex flex-col h-screen items-center  w-11/12 ml-auto lg:w-8/12 lg:mr-auto lg:ml-45'>
        <h1 className='mt-6 text-6xl text-primary font-bold'>WALLET</h1>
        <Deposit />
        <button className='bg-alternative w-fit mx-auto p-2 rounded-lg mt-3'>COMPRAR</button>
            <ul className='flex gap-6 text-white  text-sm font-bold mt-4'>
                <li className='bg-secondary dark:bg-secodary/90 p-2 rounded-sm hover:cursor-pointer' onClick={setView}>Balance</li>
                <li className='bg-secondary dark:bg-secodary/90 p-2 rounded-sm hover:cursor-pointer' onClick={setView}>Historial</li>
                <li className='bg-secondary dark:bg-secodary/90 p-2 rounded-sm hover:cursor-pointer' onClick={setView}>Enviar</li>
            </ul>
            {view}
        </div>
    );
}

export default Wallet;
