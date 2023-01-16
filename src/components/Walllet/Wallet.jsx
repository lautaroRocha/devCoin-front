import React, {useState} from 'react';

import {Balance} from '../../components'

const Wallet = () => {

    const [transactionsByUser, setTransactionsByUser] = useState([])
    const [transactionsToUser, setTransactionsToUser] = useState([])


    return (
        <div className='flex flex-col h-screen items-center  w-11/12 ml-auto lg:w-8/12 lg:mr-auto lg:ml-45'>
        <h1>WALLET</h1>
            <Balance />
            <h2>Tus monedas</h2>
            <div>
                {/* mapear las monedas */}
            </div>
            <h3>Transferencias</h3>
                <span>Historial</span>
                <span>Enviar</span>
        </div>
    );
}

export default Wallet;
