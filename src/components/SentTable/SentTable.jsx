import React, { useState, useContext, useEffect } from 'react';
import { coinsContext } from '../../context';

const SentTable = () => {
    const { transactions } = useContext(coinsContext);

    const sent = [...transactions.emisor.data].reverse();

    const [sentTransactions, setSentTransactions] = useState(sent.slice(0, 5));

    useEffect(()=>{
        const slicedSent = sent.slice(0, 5)
        setSentTransactions(slicedSent)
    },[transactions])

    const handleExpand = () => {
        if (sentTransactions.length === 5) {
            setSentTransactions(sent);
        } else {
            setSentTransactions(sent.slice(0, 5));
        }
    };

    return (
        <div className="flex w-full flex-col">
            <table className="mt-5 h-fit w-full lg:mt-2">
                <thead>
                    <tr>
                        <th colSpan={4} className="pb-2 lg:text-lg">
                            Enviadas
                        </th>
                    </tr>
                    <tr className="text-[0.6rem] lg:text-xs">
                        <th>Para</th>
                        <th>Moneda</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {sentTransactions.length > 0 ? (
                        sentTransactions.map((trans, idx) => {
                            return (
                                <tr
                                    className="w-full whitespace-nowrap text-center text-sm odd:bg-secondary/20 even:bg-secondary/50 lg:m-0"
                                    key={idx}
                                >
                                    <td className="py-3.5">#{trans.receiver_hexcode}</td>
                                    <td className="py-3.5 uppercase">{trans.symbol}</td>
                                    <td className="py-3.5">{trans.amount}</td>
                                    <td className="py-3.5">
                                        {trans.transaction_date.slice(0, 10)}
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <p className="py-8 text-center text-gray-400 dark:text-gray-400/80">
                            Aún no has enviado criptos.
                        </p>
                    )}
                </tbody>
            </table>
            {sentTransactions.length >= 5 && (
                <span
                    className="hover:cursor-pointer mt-2 text-center font-semibold text-secondary dark:text-alternative/80"
                    onClick={handleExpand}
                >
                    {sentTransactions.length === 5 ? 'ver más' : 'ver menos'}
                </span>
            )}
        </div>
    );
};

export default SentTable;
