import React, { useState, useContext, useEffect } from 'react';
import { coinsContext } from '../../context';

const ReceivedTable = () => {

    const { transactions } = useContext(coinsContext);

    const received = [...transactions.receptor.data].reverse();

    const [receivedTransactions, setReceivedTransactions] = useState([]);

    useEffect(()=>{
        const slicedReceived = received.slice(0, 5)
        setReceivedTransactions(slicedReceived)
    },[transactions])

    const handleExpand = () => {
        if (receivedTransactions.length === 5) {
            setReceivedTransactions(received);
        } else {
            setReceivedTransactions(received.slice(0, 5));
        }
    };

    return (
        <div className="flex w-full flex-col">
            <table className="mt-5 h-fit w-full lg:mt-2">
                <thead>
                    <tr>
                        <th colSpan={4} className="pb-2 lg:text-lg">
                            Recibidas
                        </th>
                    </tr>
                    <tr className="text-[0.6rem] lg:text-xs">
                        <th>De</th>
                        <th>Moneda</th>
                        <th>Cantidad</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {receivedTransactions.length > 0 ? (
                        receivedTransactions.map((trans, idx) => {
                            return (
                                <tr
                                    className="w-full whitespace-nowrap text-center text-sm odd:bg-secondary/20 even:bg-secondary/50 lg:m-0"
                                    key={idx}
                                >
                                    <td className="py-3.5">#{trans.sender_hexcode}</td>
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
                            Aún no has recibido criptos.
                        </p>
                    )}
                </tbody>
            </table>
            {received.length > 5 && (
                <span
                    className="hover:cursor-pointer mt-2 text-center font-semibold text-secondary dark:text-alternative/80"
                    onClick={handleExpand}
                >
                    {receivedTransactions.length === 5 ? 'ver más' : 'ver menos'}
                </span>
            )}
        </div>
    );
};

export default ReceivedTable;
