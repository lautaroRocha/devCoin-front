import React from 'react';
import { SentTable, ReceivedTable } from '../../components';

const TransferHistory = () => {
    
    return (
        <div className="mt-8 flex w-full flex-col justify-center gap-x-[4rem] overflow-x-auto max-2xl:gap-y-[1rem] 850:flex-row lg:flex-col 2xl:flex-row">
            <ReceivedTable/>
            <SentTable/>
        </div>
    );
};

export default TransferHistory;
