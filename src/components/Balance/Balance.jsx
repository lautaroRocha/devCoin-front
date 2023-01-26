import React, { useContext, useState, useEffect } from 'react';
import { MinCoin } from '../../components';
import { userContext, tokenContext, coinsContext } from '../../context';

const Balance = () => {
    const token = useContext(tokenContext);
    const user = useContext(userContext);
    const coins = useContext(coinsContext)


    return (
        <div className="mt-8 flex w-8/12 flex-col text-white lg:w-full">
            <div className="relative max-h-screen overflow-x-auto rounded-lg">
                <table className="w-full">
                    <thead className="bg-secondary text-xs uppercase text-white lg:text-base">
                        <tr>
                            {['Moneda', 'Balance', '', ''].map((title, index) => (
                                <td
                                    className="whitespace-nowrap py-3 px-6 font-semibold"
                                    key={index}
                                >
                                    {title}
                                </td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {coins.map((coin, index) => (
                            <MinCoin coin={coin} key={index} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Balance;
