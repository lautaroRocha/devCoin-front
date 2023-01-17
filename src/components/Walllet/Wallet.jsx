import React, {useState} from 'react';
import { AppWrap } from '../../wrapper';

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

        const sectionButtons = document.querySelectorAll('#li')
        sectionButtons.forEach( (btn) =>{
            if(btn.textContent === selectedView){
                btn.style.backgroundColor = "#f5061d"
            }else{
                btn.style.backgroundColor =  '#c0012a'
            }
        })
 

    return (
        <div className='flex flex-col items-center h-full w-full'>
        <h1 className='mt-6 text-6xl text-primary font-bold'>WALLET</h1>
        <Deposit />
        <button className='bg-alternative w-fit mx-auto p-2 rounded-lg mt-3 font-semibold hover:bg-alternative/80'>COMPRAR</button>
            <ul className='flex gap-6 text-white  text-sm font-bold mt-4'>
                <li className='bg-secondary dark:bg-secodary/90 p-2 rounded-lg hover:cursor-pointer hover:bg-secondary/80' onClick={setView} id="li" >Balance</li>
                <li className='bg-secondary dark:bg-secodary/90 p-2 rounded-lg hover:cursor-pointer hover:bg-secondary/80' onClick={setView} id="li" >Historial</li>
                <li className='bg-secondary dark:bg-secodary/90 p-2 rounded-lg hover:cursor-pointer hover:bg-secondary/80' onClick={setView} id="li" >Enviar</li>
            </ul>
            {view}
        </div>
    );
}

export default AppWrap(Wallet);
