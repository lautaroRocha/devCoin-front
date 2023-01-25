import React from 'react';

const Deposit = () => {
    return (
        <div className="grid bg-secondary/50 grid-cols-2 w-full mt-6 h-18 rounded-lg items-center text-center font-semibold p-2 lg:col-start-4">
            <span className='m-auto text-center'>
            Tu saldo actual es de $6000
            </span>
            <button className='bg-alternative w-fit m-auto p-2 rounded-lg hover:bg-alternative/80'>DEPOSITAR</button>
        </div>
    );
}

export default Deposit;
