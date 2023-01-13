import React from 'react';

const Balance = ({user}) => {

    // esto obviamente después lo sacaríamos del usuario que recibe el componente
    const USER_COINS = [{token: "lucascoin", quantity:"5"}, {token: "gonzacoin", quantity:"7"}, {token: "juanbit", quantity:"3"}]

    return (
        <div>
           <div className='flex  bg-slate-400 justify-center rounded-lg items-center mx-auto my-6 w-2/5 text-lg font-semibold'>
            <h3>Saldo disponible:</h3>
            <span>$6000</span>
           </div>
           <div className='flex flex-col gap-6 mb-28'>
           {USER_COINS.map( (coin, idx)=> {
            return(
             <div key={idx} className="flex  bg-slate-400 justify-center rounded-lg items-center mx-auto py-7 w-3/5 font-bold text-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 w-1/4 ">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
</svg>
                <span className='w-1/4'>{coin.token}</span>
                <span className='w-1/4'>{coin.quantity}</span>
                {/* acá se calcularía el valor en pesos/dolares  */}
                <span className='w-1/4'>$750</span>
             </div>
            )
           })}
           </div>
        </div>
    );
}

export default Balance;
