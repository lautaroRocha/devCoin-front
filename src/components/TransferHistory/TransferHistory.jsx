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

    console.log(sentTransactions.length);
    console.log(receivedTransactions.length);

    return (
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-x-[8rem] max-2xl:gap-y-[1rem] 850:flex-row lg:flex-col 2xl:flex-row">
            <table className="mt-5 lg:mt-2">
                <thead>
                    <tr>
                        <th>Recibidas</th>
                    </tr>
                </thead>
                <tbody>
                    {receivedTransactions.length > 0 ? (
                        receivedTransactions.map((trans, idx) => {
                            return (
                                <tr
                                    className="grid w-full grid-cols-4 place-items-center whitespace-nowrap text-center text-sm	odd:bg-secondary/20 even:bg-secondary/50 lg:m-0"
                                    key={idx}
                                >
                                    <td>#{trans.sender_hexcode}</td>
                                    <td>{trans.coinId}</td>
                                    <td>{trans.amount}</td>
                                    <td className="p-3">{trans.transaction_date.slice(0, 10)}</td>
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

            <table className="mt-5 lg:mt-2">
                <thead>
                    <tr>
                        <th>Enviadas</th>
                    </tr>
                </thead>
                <tbody>
                    {sentTransactions.length > 0 ? (
                        sentTransactions.map((trans, idx) => {
                            return (
                                <tr
                                    className="grid w-full grid-cols-4 place-items-center whitespace-nowrap text-center text-sm odd:bg-secondary/20 even:bg-secondary/50 lg:m-0"
                                    key={idx}
                                >
                                    <td>#{trans.receiver_hexcode}</td>
                                    <td>{trans.coinId}</td>
                                    <td>{trans.amount}</td>
                                    <td className="p-3">{trans.transaction_date.slice(0, 10)}</td>
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
