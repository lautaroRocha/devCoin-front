import React, { useContext, useState, useEffect } from 'react';
import { coinsContext } from '../../context';

const TransferHistory = () => {
    const { transactions } = useContext(coinsContext);
    const [sentTransactions, setSentTransactions] = useState([]);
    const [receivedTransactions, setReceivedTransactions] = useState([]);

    useEffect(() => {
        const emitted = transactions.emisor.data.slice(0).slice(-5);
        const received = transactions.receptor.data.slice(0).slice(-5);
        setSentTransactions(emitted);
        setReceivedTransactions(received);
    }, [transactions]);

    return (
        <div className="mt-8 flex w-full flex-col justify-center gap-x-[8rem] overflow-x-auto max-2xl:gap-y-[1rem] 850:flex-row lg:flex-col 2xl:flex-row">
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
                                    <td className="py-3.5">{trans.symbol}</td>
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

            <table className="mt-5 h-fit w-full lg:mt-2">
                <thead>
                    <tr>
                        <th colSpan={4} className="pb-2 lg:text-lg">
                            Enviadas
                        </th>
                    </tr>
                    <tr className="text-[0.6rem] lg:text-xs">
                        <th>A</th>
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
                                    <td className="py-3.5">{trans.coinId}</td>
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
        </div>
    );
};

export default TransferHistory;
