import React, { useContext } from 'react';
import { coinsContext } from '../../context';
import {SentTable, ReceivedTable} from '../../components';

const TransferHistory = () => {

    const { transactions } = useContext(coinsContext);
    
    const emitted =[...transactions.emisor.data].reverse();
    const received = [...transactions.receptor.data].reverse().slice(0, 5);

    return (
        <div className="mt-8 flex w-full flex-col justify-center gap-x-[8rem] overflow-x-auto max-2xl:gap-y-[1rem] 850:flex-row lg:flex-col 2xl:flex-row">
            <ReceivedTable received={received}/>
            <SentTable sent={emitted}/>
        </div>
    );
};

export default TransferHistory;
