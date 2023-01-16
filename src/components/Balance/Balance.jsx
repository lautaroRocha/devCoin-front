import React from 'react';
import {MinCoin} from "../../components"

const Balance = ({user}) => {

    // esto obviamente después lo sacaríamos del usuario que recibe el componente
    const USER_COINS = [{token: "lucascoin", quantity:"5"}, {token: "gonzacoin", quantity:"7"}, {token: "juanbit", quantity:"3"}]

    return (
        <div className=' text-white w-8/12'>
           <div className='flex   bg-secondary dark:bg-secondary/90 justify-center rounded-lg items-center my-10 mx-auto w-5/5 text-lg font-semibold px-3 py-1 sm:w-fit'>
            <h3>Saldo disponible:</h3>
            <span>$6000</span>
           </div>
           <div className="group flex flex-col gap-6 mb-28 items-center w-12/12">
           {USER_COINS.map( (coin, idx)=> {
            return(
            <MinCoin coin={coin} idx={idx} />
            )
           })}          
           </div>
        </div>
    );
}

export default Balance;
