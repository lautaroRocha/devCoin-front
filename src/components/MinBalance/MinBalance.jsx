import React, { useContext } from 'react';
import * as Icons from '../../utils/icons';
import { coinsContext } from '../../context';

const MinBalance = () => {
    const { wallet } = useContext(coinsContext);

    return (
        <div className="glassMoney mt-4 flex h-[4rem] w-full items-center justify-start gap-x-4 rounded-md px-[4rem] dark:bg-gray-800/50 dark:text-white max-350:px-[0.5rem] md:ml-5 md:mt-0 md:h-[11.5rem] md:w-[40%]">
            <span>{Icons.bill}</span>
            <span className="ml-auto text-2xl font-bold lg:text-4xl">${wallet.balance}</span>
        </div>
    );
};

export default MinBalance;
