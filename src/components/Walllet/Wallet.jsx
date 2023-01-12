import React from 'react';

import {Balance} from '../../components'

const Wallet = () => {
    return (
        <>
        <h1>WALLET</h1>
            <Balance />
            <h2>Tus monedas</h2>
            <div>
                {/* mapear las monedas */}
            </div>
            <h3>Transferencias</h3>
                <span>Historial</span>
                <span>Enviar</span>
        </>
    );
}

export default Wallet;
