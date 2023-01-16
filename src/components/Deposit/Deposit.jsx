import React from 'react';

const Deposit = () => {
    return (
        <div className="grid bg-secondary/50 grid-cols-2 w-9/12 mt-6 h-20 rounded-lg items-center text-center font-semibold p-2 min-h-20 max-h-20">
            <span>
            Tu saldo actual es de $6000
            </span>
            <button className='bg-alternative w-fit m-auto p-2 rounded-lg'>DEPOSITAR</button>
        </div>
    );
}

export default Deposit;
