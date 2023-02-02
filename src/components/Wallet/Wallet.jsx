import React, { useContext } from 'react';
import { MinCoin } from '..';
import { coinsContext } from '../../context';

const Wallet = () => {
    const { coins } = useContext(coinsContext);
    return (
        <div className="mt-8 flex w-full flex-col">
            <div className="relative max-h-screen overflow-x-auto rounded-md">
                <table className="w-full">
                    <thead className="bg-secondary text-xs uppercase text-white lg:text-xs">
                        <tr>
                            {['Moneda', 'Balance', 'Valor en USD', ''].map((title, index) => (
                                <td
                                    className="whitespace-nowrap py-3 px-14 font-semibold"
                                    key={index}
                                >
                                    {title}
                                </td>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {coins.length === 0 ? (
                            <tr className="text-center text-lg">
                                <td
                                    colSpan={4}
                                    className="py-8 text-gray-400 dark:text-gray-400/80"
                                >
                                    No tienes ninguna moneda
                                </td>
                            </tr>
                        ) : (
                            coins.map((coin, index) => <MinCoin coin={coin} key={index} />)
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Wallet;
